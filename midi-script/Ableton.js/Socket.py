import socket
import sys
import errno
import traceback
import json


class Socket(object):

    @staticmethod
    def set_log(func):
        Socket.log_message = func

    @staticmethod
    def set_message(func):
        Socket.show_message = func

    def __init__(self, remotehost='127.0.0.1', remoteport=9000, localhost='127.0.0.1', localport=9001):
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self._socket.setblocking(0)

        self._local_addr = (localhost, localport)
        self._remote_addr = (remotehost, remoteport)

        try:
            self._socket.bind(self._local_addr)
            self.log_message('Starting on: ' + str(self._local_addr) +
                             ', remote addr: ' + str(self._remote_addr))
        except:
            msg = 'ERROR: Cannot bind to ' + \
                str(self._local_addr) + ', port in use'
            self.show_message(msg)
            self.log_message(msg)

    def set_handler(self, func):
        self.input_handler = func

    def send(self, name, obj, uuid=None):
        try:
            self._socket.sendto(json.dumps(
                {"event": name, "data": obj, "uuid": uuid}), self._remote_addr)
            self.log_message("Socket Event " + name +
                             "(" + uuid + "): " + json.dumps(obj))
        except Exception, e:
            self._socket.sendto(json.dumps(
                {"event": "error", "data": type(e).__name__ + ': ' + str(e.args[0])}), self._remote_addr)

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

    def shutdown(self):
        self._socket.close()
