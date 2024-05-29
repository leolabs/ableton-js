class SocketInterface:
    def send(self, name, obj, uuid):
        raise NotImplementedError("send method must be implemented by socket subclasses")

    def shutdown(self):
        raise NotImplementedError("shutdown method must be implemented by socket subclasses")
