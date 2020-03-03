import socket
import sys
import errno
import traceback
import json
from threading import Timer
import SocketServer
import threading


class TCPHandler(SocketServer.StreamRequestHandler):
    def jsonReplace(o):
        return str(o)

    def send(self, name, obj=None, uuid=None):
        self.wfile.write(json.dumps({"event": name, "data": obj, "uuid": uuid}, default=self.jsonReplace, ensure_ascii=False) + "\n")

    def setup(self):
        SocketServer.StreamRequestHandler.setup(self)
        self.server.clients[str(self.client_address)] = self

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

    def shutdown(self):
        self.server.shutdown()