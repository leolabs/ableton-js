import socket
import sys
import errno
import traceback
import json
import struct
from threading import Timer
import SocketServer
import threading


def split_by_n(seq, n):
    '''A generator to divide a sequence into chunks of n units.'''
    while seq:
        yield seq[:n]
        seq = seq[n:]


class TCPHandler(SocketServer.StreamRequestHandler):
    def jsonReplace(o):
        return str(o)

    def send(self, name, obj=None, uuid=None):
        self.wfile.write(json.dumps({"event": name, "data": obj, "uuid": uuid}, default=self.jsonReplace, ensure_ascii=False) + "\n")

    def setup(self):
        SocketServer.StreamRequestHandler.setup(self)
        self.server.clients[str(self.client_address)] = self


class Socket(object):
    def handle(self):
        while 1:
            data = self.rfile.readline().strip()
            payload = json.loads(data)
            self.server.input_handler(payload, self.send)

    def finish(self):
        SocketServer.StreamRequestHandler.finish(self)
        self.server.clients.pop(str(self.client_address), None)

class Server(SocketServer.ThreadingTCPServer):
    clients = dict()
    def __init__(self, handler, remotehost='127.0.0.1', remoteport=9010, localhost='127.0.0.1', localport=9011):
        self.input_handler = handler

    def __init__(self, server_address, RequestHandlerClass, input_handler, bind_and_activate=True):
            self.input_handler = input_handler
            SocketServer.TCPServer.__init__(self, server_address, RequestHandlerClass, bind_and_activate=True)


class Socket(object):
    def __init__(self, handler, localhost='127.0.0.1', localport=9001):
        self.address = (localhost, localport)
        self.handler = handler
        self.bind()

    def send(self, name, obj=None, uuid=None):
        for k, v in self.server.clients.items():
            v.send(name, obj, uuid)

    def bind(self):
        try:
            self.log_message('Starting on: ' + str(self.address))
            self.server = Server(self.address, TCPHandler, self.handler)
            thread = threading.Thread(target=self.server.serve_forever)
            thread.daemon = True
            thread.start()
        except Exception as e:
            self.log_message(str(sys.exc_info()))
            msg = 'ERROR: Cannot bind to ' + \
                str(self.address) + ', port in use. Trying again...'
            self.show_message(msg)
            self.log_message(msg)
            t = Timer(5, self.bind)
            t.start()

    def _sendto(self, msg):
        '''Send a raw message to the client, compressed and chunked, if necessary'''
        compressed = msg.encode("zlib") + "\n"
        limit = 1024

        if len(compressed) < limit:
            self._socket.sendto('\xFF' + compressed, self._remote_addr)
        else:
            chunks = list(split_by_n(compressed, limit))
            count = len(chunks)
            for i, chunk in enumerate(chunks):
                self._socket.sendto(struct.pack("B", i if i + 1 < count else 255) + compressed, self._remote_addr)

    def send(self, name, obj=None, uuid=None):
        def jsonReplace(o):
            return str(o)

        try:
            self._sendto(json.dumps(
                {"event": name, "data": obj, "uuid": uuid}, default=jsonReplace, ensure_ascii=False))
            self.log_message("Socket Event " + name +
                             "(" + str(uuid) + "): " + json.dumps(obj))
        except Exception, e:
            error = str(type(e).__name__) + ': ' + str(e.args)
            self._sendto(json.dumps(
                {"event": "error", "data": error, "uuid": uuid}, default=jsonReplace, ensure_ascii=False))
            self.log_message("Socket Error " + name +
                             "(" + str(uuid) + "): " + str(e))

    def shutdown(self):
        self.server.shutdown()