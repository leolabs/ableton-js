import socket
import thread
import json
from threading import Timer


class Socket(object):
    @staticmethod
    def set_log(func):
        Socket.log_message = func

    @staticmethod
    def set_message(func):
        Socket.show_message = func

    def __init__(self, handler, localhost='127.0.0.1', localport=9001):
        self.input_handler = handler
        self.clients = []
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        self._local_addr = (localhost, localport)

        self.bind()

    def bind(self):
        try:
            self._socket.bind(self._local_addr)
            self._socket.listen(10)
            self.log_message('Listening on: ' + str(self._local_addr))
        except Exception, e:
            msg = 'ERROR: Cannot bind to ' + \
                str(self._local_addr) + ': ' + str(e.args)
            self.show_message(msg)
            self.log_message(msg)
            t = Timer(5, self.bind)
            t.start()

    def send(self, name, obj=None, uuid=None):
        def jsonReplace(o):
            return str(o)

        try:
            self.send_to_all(json.dumps(
                {"event": name, "data": obj, "uuid": uuid}, default=jsonReplace, ensure_ascii=False))
            self.log_message("Socket Event " + name +
                             "(" + str(uuid) + "): " + json.dumps(obj))
        except Exception, e:
            self.send_to_all(json.dumps(
                {"event": "error", "data": str(type(e).__name__) + ': ' + str(e.args), "uuid": uuid}, default=jsonReplace, ensure_ascii=False))
            self.log_message("Socket Error " + name +
                             "(" + str(uuid) + "): " + str(e))

    def send_to_all(self, message):
        def sender(socket, message):
            socket.send(message)

        for client in self.clients:
            thread.start_new_thread(sender, (client, message))

    def shutdown(self):
        self._socket.close()

    def process(self):
        def socket_handler(socket, handler):
            while True:
                try:
                    data = socket.recv(65536)
                    if len(data) and handler:
                        payload = json.loads(data)
                        handler(payload)
                    else:
                        break
                except Exception, e:
                    self.log_message('Client Exception: ' + str(e.args))
                    self.clients.remove(socket)
                    return

        try:
            clientsocket, addr = self._socket.accept()
            self.clients.append(clientsocket)
            self.log_message('New client: ' + str(addr))
            thread.start_new_thread(
                socket_handler, (clientsocket, self.input_handler))

        except socket.error:
            return
        except Exception, e:
            self.log_message("Error: " + str(e.args))
