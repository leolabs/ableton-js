from __future__ import absolute_import
import queue
from .version import version
from .Logging import logger
from .Socket.TCPSocket import Socket, WebsocketMessageHandler, WebsocketHandshakeHandler
from .AbletonJSBase import AbletonJSBase
import Live


class AbletonJSTCP(AbletonJSBase):
    def __init__(self, c_instance):
        super(AbletonJSTCP, self).__init__(c_instance)
        self.message_queue = queue.Queue()
        self.socket_handshake_handler = WebsocketHandshakeHandler()
        self.socket_message_handler = WebsocketHandshakeHandler()
        self.socket = Socket(self.socket_callback, self.socket_handshake_handler, self.socket_websocket_handler)
        self.socket.start()
        self.check_queue = Live.Base.Timer(callback=self.process_queue, interval=20, repeat=True)
        self.check_queue.start()
 

    def socket_callback(self, payload):
        self.message_queue.put(payload)
        
    def process_queue(self):
        if not self.message_queue.empty():
            try:
                payload = self.message_queue.get()
                logger.debug(f"Payload: {payload}")
                self.command_handler(payload)
            except Exception as e:
                logger.error(f'Error processing queue: {e}')
                
                
    def disconnect(self):
        self.check_queue.stop()
        self.message_queue.clear()
        self.message_queue = None
        super(AbletonJSTCP, self).disconnect()

    