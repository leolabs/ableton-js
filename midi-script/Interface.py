import hashlib
import json

from .Config import DEBUG
from .Logging import logger


class ConnectionSubscribers:
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


class Interface:
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

    def format_result(self, result, etag, cache):
        """Returns the payload the client expects for a command result."""
        if not cache:
            return result

        def jsonReplace(o):
            return str(o)

        response = json.dumps(result, default=jsonReplace, ensure_ascii=False)
        hash = hashlib.md5(response.encode("utf-8", "replace")).hexdigest()

        if hash == etag:
            return {"__cached": True}
        return {"data": result, "etag": hash}

    def dispatch(self, payload, connection):
        """Runs one command and returns its result value (or cache wrapper)."""
        name = payload.get("name")
        etag = payload.get("etag")
        args = payload.get("args", {})
        cache = payload.get("cache", False)
        nsid = payload.get("nsid")

        ns = self.get_ns(nsid)

        if hasattr(self, name) and callable(getattr(self, name)):
            if name == "add_listener" or name == "remove_listener":
                kwargs = dict(args)
                kwargs.pop("connection", None)
                result = getattr(self, name)(ns=ns, connection=connection, **kwargs)
            else:
                result = getattr(self, name)(ns=ns, **args)
            return self.format_result(result, etag, cache)

        if hasattr(ns, name) and callable(getattr(ns, name)):
            if isinstance(args, dict):
                result = getattr(ns, name)(**args)
            elif isinstance(args, list):
                result = getattr(ns, name)(*args)
            else:
                raise Exception(
                    "Function call failed: " + str(args) + " are invalid arguments"
                )
            return self.format_result(result, etag, cache)

        raise Exception(
            "Function call failed: " + str(name) + " doesn't exist or isn't callable"
        )

    def add_listener(self, ns, prop, eventId, connection, nsid="Default"):
        try:
            add_fn = getattr(ns, "add_" + prop + "_listener")
        except:
            raise Exception("Listener " + str(prop) + " does not exist.")

        key = str(nsid) + ":" + prop
        self.log_debug("Listener key: " + key)

        if key in self.listeners:
            return self.listeners[key]["subscribers"].subscribe(connection, eventId)

        subscribers = ConnectionSubscribers()
        subscribers.subscribe(connection, eventId)

        def fn():
            value = self.get_prop(ns, prop)
            entry = self.listeners.get(key)
            if not entry:
                return
            entry["subscribers"].send_each(self.socket, value)

        self.log_debug("Attaching listener: " + key + ", event ID: " + eventId)
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
            raise Exception(
                "Listener " + str(prop) + " could not be removed: " + str(e)
            )

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

            def set_fn(ns, value):
                return setattr(ns, prop, value)

        return set_fn(ns, value)

    def _is_listener_api(self, name):
        if name.endswith("_has_listener"):
            return True
        if name.endswith("_listener") and name.startswith(("add_", "remove_")):
            return True
        return False

    def get_observable_properties(self, ns):
        props = []
        for name in dir(ns):
            if name.startswith("add_") and name.endswith("_listener"):
                props.append(name[4:-9])  # strip add_ / _listener
        return sorted(set(props))

    def get_available_properties(self, ns):
        props = []
        for name in dir(ns):
            if name.startswith("_") or self._is_listener_api(name):
                continue
            try:
                attr = getattr(ns, name)
            except:
                continue
            if callable(attr):
                continue
            props.append(name)
        return sorted(props)

    def get_available_functions(self, ns):
        funcs = []
        for name in dir(ns):
            if name.startswith("_") or self._is_listener_api(name):
                continue
            try:
                attr = getattr(ns, name)
            except:
                continue
            if not callable(attr) or name[:1].isupper():
                continue
            funcs.append(name)
        return sorted(funcs)
