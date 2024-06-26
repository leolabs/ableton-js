class MessageHandlerInterface:
    def receive_message(self, connection):
        raise NotImplementedError("receive_message method must be implemented by MassageHandler subclasses")

    def send_message(self, connection, message):
        raise NotImplementedError("send_message method must be implemented by MessageHandler subclasses")
    
class HandshakeHandlerInterface:
    def parse_headers(self, request):
        raise NotImplementedError("parse_headers method must be implemented by HandshakeHandler subclasses")
    
    def generate_accept_key(self, websocket_key):
        raise NotImplementedError("generate_accept_key method should be implemented by HandshakeHandler subclasses")
    
    def perform_handshake(self, connection):
        raise NotImplementedError("perform_handshake method must be implemented by HandshakeHandler subclasses")
    
class SocketInterface:
    def send(self, name, obj=None, uuid=None):
        raise NotImplementedError("send method must be implemented by socket subclasses")

    def shutdown(self):
        raise NotImplementedError("shutdown method must be implemented by socket subclasses")

