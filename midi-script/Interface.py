class Interface(object):
    obj_ids = dict()
    listeners = dict()

    @staticmethod
    def save_obj(obj):
        obj_id = id(obj)
        Interface.obj_ids[obj_id] = obj
        return obj_id

    @staticmethod
    def get_obj(obj_id):
        return Interface.obj_ids[obj_id]

    def __init__(self, c_instance, socket):
        self.ableton = c_instance
        self.socket = socket
        self.log_message = c_instance.log_message

    def get_ns(self, nsid):
        return Interface.obj_ids[nsid]

    def handle(self, payload):
        func = getattr(self, payload["name"])
        uuid = payload["uuid"] if payload.has_key("uuid") else None
        ns = self.get_ns(nsid=payload["nsid"]
                         if payload.has_key("nsid") else None)

        if func is not None and callable(func):
            try:
                result = func(
                    ns=ns, **payload["args"]) if payload.has_key("args") else func(ns=ns)
                self.socket.send("result", result, uuid)
            except Exception, e:
                self.socket.send("error", str(e.args[0]), uuid)
        else:
            self.socket.send(
                "error", "Function call failed: " + payload["name"] + " doesn't exist or isn't callable", uuid)

    def add_listener(self, ns, prop, eventId, nsid="Default"):
        try:
            add_fn = getattr(ns, "add_" + prop + "_listener")
        except:
            raise Exception("Listener " + str(prop) + " does not exist.")

        key = str(nsid) + prop
        self.log_message("Add key: " + key)
        if self.listeners.has_key(key):
            return self.listeners[key]["id"]

        def fn():
            return self.socket.send(eventId, self.get_prop(ns, prop))

        add_fn(fn)
        self.listeners[key] = {"id": eventId, "fn": fn}
        return eventId


    def remove_listener(self, ns, prop, nsid="Default"):
        key = str(nsid) + prop
        self.log_message("Remove key: " + key)
        if not self.listeners.has_key(key):
            raise Exception("Listener " + str(prop) + " does not exist.")

        try:
            remove_fn = getattr(ns, "remove_" + prop + "_listener")
            remove_fn(self.listeners[key]["fn"])
            self.listeners.pop(key, None)
            return True
        except Exception as e:
            raise Exception("Listener " + str(prop) + " could not be removed: " + str(e))

    def get_prop(self, ns, prop):
        try:
            get_fn = getattr(self, "get_" + prop)
        except:
            def get_fn(ns): return getattr(ns, prop)

        return get_fn(ns)

    def set_prop(self, ns, prop, value):
        try:
            set_fn = getattr(self, "set_" + prop)
        except:
            def set_fn(ns, value): return setattr(ns, prop, value)

        return set_fn(ns, value)

    def __getattr__(self, fnName):
        if fnName.startswith('get_'):
            raise AttributeError()
        if fnName.startswith('set_'):
            raise AttributeError()

        def wrapper(ns, *args, **kw):
            if hasattr(ns, fnName):
                self.log_message('Generic: %s.%s called with %r %r' %
                                 (type(self).__name__, fnName, args, kw))
                return getattr(ns, fnName)(*args, **kw)
            raise AttributeError()
        return wrapper