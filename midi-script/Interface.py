import hashlib
import json

from .Config import DEBUG
from .Logging import logger


class ConnectionSubscribers(object):
    """Maps a WebSocket connection to its event id for one listener."""

    def __init__(self):
        self._subs = {}

    def is_empty(self):
        return not self._subs

    def subscribe(self, connection, event_id):
        existing = self._subs.get(connection)
        if existing is not None:
            return existing
        self._subs[connection] = event_id
        return event_id

    def unsubscribe(self, connection):
        if connection not in self._subs:
            return False
        del self._subs[connection]
        return True

    def items(self):
        return list(self._subs.items())

    def send_each(self, socket, data):
        for conn, event_id in self.items():
            socket.send_to(conn, event_id, data)


class Interface(object):
    obj_ids = dict()
    listeners = dict()

    @staticmethod
    def save_obj(obj):
        try:
            obj_id = "live_" + str(obj._live_ptr)
        except:
            obj_id = "id_" + str(id(obj))

        Interface.obj_ids[obj_id] = obj
        return obj_id

    @staticmethod
    def get_obj(obj_id):
        obj = Interface.obj_ids.get(obj_id)
        if obj is None:
            raise Exception("Unknown object id: %s" % obj_id)
        return obj

    def __init__(self, c_instance, socket):
        self.ableton = c_instance
        self.socket = socket

    def log_debug(self, message):
        if DEBUG:
            logger.debug(message)

    def get_ns(self, nsid):
        return Interface.get_obj(nsid)

    def send_result(self, result, uuid, etag, cache, connection):
        """Sends an empty response if the etag matches the result, or the result together with an etag."""
        if not cache:
            return self.socket.send_to(connection, "result", result, uuid)

        def jsonReplace(o):
            return str(o)

        response = json.dumps(result, default=jsonReplace, ensure_ascii=False)
        hash = hashlib.md5(response.encode("utf-8", "replace")).hexdigest()

        if hash == etag:
            return self.socket.send_to(connection, "result", {"__cached": True}, uuid)
        else:
            return self.socket.send_to(
                connection, "result", {"data": result, "etag": hash}, uuid)

    def handle(self, payload, connection):
        name = payload.get("name")
        uuid = payload.get("uuid")
        etag = payload.get("etag")
        args = payload.get("args", {})
        cache = payload.get("cache", False)
        nsid = payload.get("nsid")

        try:
            ns = self.get_ns(nsid)
            # Try self-defined functions first
            if hasattr(self, name) and callable(getattr(self, name)):
                if name == "add_listener" or name == "remove_listener":
                    kwargs = dict(args)
                    kwargs.pop("connection", None)
                    result = getattr(self, name)(
                        ns=ns, connection=connection, **kwargs)
                else:
                    result = getattr(self, name)(ns=ns, **args)
                self.send_result(result, uuid, etag, cache, connection)
            # Check if the function exists in the Ableton API as fallback
            elif hasattr(ns, name) and callable(getattr(ns, name)):
                if isinstance(args, dict):
                    result = getattr(ns, name)(**args)
                    self.send_result(result, uuid, etag, cache, connection)
                elif isinstance(args, list):
                    result = getattr(ns, name)(*args)
                    self.send_result(result, uuid, etag, cache, connection)
                else:
                    self.socket.send_to(
                        connection,
                        "error",
                        "Function call failed: " + str(args) +
                        " are invalid arguments",
                        uuid)
            else:
                self.socket.send_to(
                    connection,
                    "error",
                    "Function call failed: " + payload["name"] +
                    " doesn't exist or isn't callable",
                    uuid)
        except Exception as e:
            logger.error("Handler Error:")
            logger.exception(e)
            self.socket.send_to(connection, "error", str(e.args[0]), uuid)

    def add_listener(self, ns, prop, eventId, connection, nsid="Default"):
        try:
            add_fn = getattr(ns, "add_" + prop + "_listener")
        except:
            raise Exception("Listener " + str(prop) + " does not exist.")

        key = str(nsid) + ":" + prop
        self.log_debug("Listener key: " + key)

        if key in self.listeners:
            return self.listeners[key]["subscribers"].subscribe(
                connection, eventId)

        subscribers = ConnectionSubscribers()
        subscribers.subscribe(connection, eventId)

        def fn():
            value = self.get_prop(ns, prop)
            entry = self.listeners.get(key)
            if not entry:
                return
            entry["subscribers"].send_each(self.socket, value)

        self.log_debug("Attaching listener: " +
                       key + ", event ID: " + eventId)
        add_fn(fn)
        self.listeners[key] = {
            "fn": fn,
            "subscribers": subscribers,
            "ns": ns,
            "prop": prop,
        }
        return eventId

    def remove_listener(self, ns, prop, connection, nsid="Default"):
        key = str(nsid) + ":" + prop
        self.log_debug("Remove key: " + key)
        if key not in self.listeners:
            raise Exception("Listener " + str(prop) + " does not exist.")

        subscribers = self.listeners[key]["subscribers"]
        if not subscribers.unsubscribe(connection):
            raise Exception("Listener " + str(prop) + " does not exist.")
        if not subscribers.is_empty():
            return True

        try:
            Interface._detach_listener(key)
            return True
        except Exception as e:
            raise Exception("Listener " + str(prop) +
                            " could not be removed: " + str(e))

    @staticmethod
    def drop_connection(connection):
        empty = []
        for key, entry in list(Interface.listeners.items()):
            subscribers = entry["subscribers"]
            subscribers.unsubscribe(connection)
            if subscribers.is_empty():
                empty.append(key)
        for key in empty:
            try:
                Interface._detach_listener(key)
            except Exception:
                logger.error("Could not detach listener " + str(key))
                Interface.listeners.pop(key, None)

    @staticmethod
    def _detach_listener(key):
        entry = Interface.listeners.get(key)
        if not entry:
            return
        ns = entry.get("ns")
        prop = entry.get("prop")
        fn = entry.get("fn")
        remove_fn = getattr(ns, "remove_" + prop + "_listener")
        remove_fn(fn)
        Interface.listeners.pop(key, None)

    def get_prop(self, ns, prop):
        try:
            get_fn = getattr(self, "get_" + prop)
        except:
            def get_fn(ns):
                result = getattr(ns, prop)
                return result

        return get_fn(ns)

    def set_prop(self, ns, prop, value):
        try:
            set_fn = getattr(self, "set_" + prop)
        except:
            def set_fn(ns, value): return setattr(ns, prop, value)

        return set_fn(ns, value)
