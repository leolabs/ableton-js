class Interface(object):
    obj_ids = dict()

    @staticmethod
    def save_obj(obj):
        obj_id = str(obj)
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
        pass

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

    def add_listener(self, ns, prop, eventId):
        try:
            add_fn = getattr(ns, "add_" + prop + "_listener")
        except:
            raise Exception("Listener " + str(prop) + " does not exist.")

        def fn():
            return self.socket.send(eventId, self.get_prop(ns, prop))

        add_fn(fn)
        return eventId

    def remove_listener(self, ns, prop):
        try:
            remove_fn = getattr(ns, "remove_" + prop + "_listener")
            return remove_fn()
        except:
            raise Exception("Listener " + str(prop) + " does not exist.")

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
