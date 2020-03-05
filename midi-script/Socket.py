import socket
import sys
import errno
import traceback
import json
from threading import Timer


class Socket(object):

    @staticmethod
    def set_log(func):
        Socket.log_message = func

    @staticmethod
    def set_message(func):
        Socket.show_message = func

    def __init__(self, handler, remotehost='127.0.0.1', remoteport=9004, localhost='127.0.0.1', localport=9005):
        self.input_handler = handler

        self._socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self._socket.setblocking(0)

        self._local_addr = (localhost, localport)
        self._remote_addr = (remotehost, remoteport)

        self.bind()

    def bind(self):
        try:
            self._socket.bind(self._local_addr)
            self.log_message('Starting on: ' + str(self._local_addr) +
                             ', remote addr: ' + str(self._remote_addr))
        except:
            msg = 'ERROR: Cannot bind to ' + \
                str(self._local_addr) + ', port in use. Trying again...'
            self.show_message(msg)
            self.log_message(msg)
            t = Timer(5, self.bind)
            t.start()

    def send(self, name, obj=None, uuid=None):
        def jsonReplace(o):
            return str(o)

        try:
            self._socket.sendto(json.dumps(
                {"event": name, "data": obj, "uuid": uuid}, default=jsonReplace, ensure_ascii=False), self._remote_addr)
            self.log_message("Socket Event " + name +
                             "(" + str(uuid) + "): " + json.dumps(obj))
        except Exception, e:
            self._socket.sendto(json.dumps(
                {"event": "error", "data": str(type(e).__name__) + ': ' + str(e.args), "uuid": uuid}, default=jsonReplace, ensure_ascii=False), self._remote_addr)
            self.log_message("Socket Error " + name +
                             "(" + str(uuid) + "): " + str(e))

    def shutdown(self):
        self._socket.close()

    def process(self):
        try:
            while 1:
                data = self._socket.recv(65536)
                self.log_message(data)
                if len(data) and self.input_handler:
                    payload = json.loads(data)
                    self.input_handler(payload)
        except socket.error:
            return
        except Exception, e:
            self.log_message("Error: " + str(e.args))
