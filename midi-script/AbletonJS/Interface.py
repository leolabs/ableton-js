class Interface(object):
    def __init__(self, c_instance, socket, log):
        self.ableton = c_instance
        self.socket = socket
        self.log_message = log
        self.ns = None

    def handle(self, payload):
        func = getattr(self, payload["name"])
        uuid = payload["uuid"] if payload.has_key("uuid") else None

        if func is not None and callable(func):
            try:
                result = func(
                    **payload["args"]) if payload.has_key("args") else func()
                self.socket.send("result", result, uuid)
            except Exception, e:
                self.socket.send("error", str(e.args), uuid)
        else:
            self.socket.send(
                "error", "Function call failed: " + payload["name"] + " doesn't exist or isn't callable", uuid)

    def add_listener(self, prop, eventId):
        try:
            add_fn = getattr(self.ns, "add_" + prop + "_listener")
        except:
            raise Exception("Listener " + str(prop) + " does not exist.")

        def fn():
            return self.socket.send(eventId, self.get_prop(prop))

        add_fn(fn)
        return eventId

    def remove_listener(self, prop):
        try:
            remove_fn = getattr(self.ns, "remove_" + prop + "_listener")
            return remove_fn()
        except:
            raise Exception("Listener " + str(prop) + " does not exist.")

    def get_prop(self, prop):
        try:
            get_fn = getattr(self, "get_" + prop)
        except:
            def get_fn(): return getattr(self.ns, prop)

        return get_fn()

    def set_prop(self, prop, value):
        try:
            set_fn = getattr(self, "set_" + prop)
        except:
            def set_fn(): return setattr(self.ns, prop, value)

        return set_fn(value)
