import socket
import json
import struct
import zlib
import os
import tempfile
from threading import Timer

import Live


def split_by_n(seq, n):
    '''A generator to divide a sequence into chunks of n units.'''
    while seq:
        yield seq[:n]
        seq = seq[n:]


server_port_file = "ableton-js-server.port"
client_port_file = "ableton-js-client.port"

server_port_path = os.path.join(tempfile.gettempdir(), server_port_file)
client_port_path = os.path.join(tempfile.gettempdir(), client_port_file)


class Socket(object):

    @staticmethod
    def set_log(func):
        Socket.log_message = func

    @staticmethod
    def set_message(func):
        Socket.show_message = func

    def __init__(self, handler):
        self.input_handler = handler
        self._server_addr = ("127.0.0.1", 0)
        self._client_addr = ("127.0.0.1", 39031)
        self._last_error = ""
        self._socket = None

        self.read_remote_port()
        self.init_socket(True)

    def log_once(self, msg):
        if self._last_error != msg:
            self._last_error = msg
            self.log_message(msg)

    def set_client_port(self, port):
        self.log_message("Setting client port: ", str(port))
        self.show_message("Client connected on port " + str(port))
        self._client_addr = ("127.0.0.1", int(port))

    def read_last_server_port(self):
        try:
            with open(server_port_path) as file:
                port = int(file.read())

            self.log_message("Stored server port: " + str(port))
            return port
        except Exception as e:
            self.log_message(
                "Couldn't read stored server port: " + str(e.args))
            return None

    def read_remote_port(self):
        '''Reads the port our client is listening on'''

        try:
            os.stat(client_port_path)
        except Exception as e:
            self.log_once("Couldn't stat remote port file: " + str(e.args))
            return

        try:
            old_port = self._client_addr[1]

            with open(client_port_path) as file:
                port = int(file.read())

                if port != old_port:
                    self.log_message("[" + str(id(self)) + "] Client port changed from " +
                                     str(old_port) + " to " + str(port))
                    self._client_addr = ("127.0.0.1", port)

                    if self._socket:
                        self.send("connect", {"port": self._server_addr[1]})
        except Exception as e:
            self.log_once("Couldn't read remote port file: " + str(e.args))

    def shutdown(self):
        self.log_message("Shutting down...")
        self._socket.close()
        self._socket = None

    def init_socket(self, try_stored=False):
        self.log_message(
            "Initializing socket, from stored: " + str(try_stored))

        try:
            stored_port = self.read_last_server_port()

            # Try the port we used last time first
            if try_stored and stored_port:
                self._server_addr = ("127.0.0.1", stored_port)
            else:
                self._server_addr = ("127.0.0.1", 0)

            self._socket = socket.socket(
                socket.AF_INET, socket.SOCK_DGRAM)
            self._socket.setblocking(0)
            self._socket.bind(self._server_addr)
            port = self._socket.getsockname()[1]

            # Get the chunk limit of the socket, minus 1 for the ordering byte
            self._chunk_limit = self._socket.getsockopt(
                socket.SOL_SOCKET, socket.SO_SNDBUF) - 1

            self.log_message("Chunk limit: " + str(self._chunk_limit))

            # Write the chosen port to a file
            try:
                if stored_port != port:
                    with open(server_port_path, "w") as file:
                        file.write(str(port))
            except Exception as e:
                self.log_once("Couldn't save port in file: " + str(e.args))
                raise e

            try:
                self.send("connect", {"port": self._server_addr[1]})
            except Exception as e:
                self.log_message("Couldn't send connect to " +
                                 str(self._client_addr) + ": " + str(e.args))

            self.show_message("Started server on port " + str(port))

            self.log_message('Started server on: ' + str(self._socket.getsockname()) +
                             ', client addr: ' + str(self._client_addr))
        except Exception as e:
            msg = 'ERROR: Cannot bind to ' + \
                str(self._server_addr) + ': ' + \
                str(e.args) + ', trying again. ' + \
                'If this keeps happening, try restarting your computer.'
            self.log_once(msg + "(Client address: " +
                          str(self._client_addr) + ")")
            self.show_message(msg)
            t = Timer(5, self.init_socket)
            t.start()

    def _sendto(self, msg):
        '''Send a raw message to the client, compressed and chunked, if necessary'''
        compressed = zlib.compress(msg.encode("utf8")) + b'\n'

        if self._socket == None:
            return

        if len(compressed) < self._chunk_limit:
            self._socket.sendto(b'\xFF' + compressed, self._client_addr)
        else:
            chunks = list(split_by_n(compressed, self._chunk_limit))
            count = len(chunks)
            for i, chunk in enumerate(chunks):
                count_byte = struct.pack("B", i if i + 1 < count else 255)
                self._socket.sendto(count_byte + chunk, self._client_addr)

    def send(self, name, obj=None, uuid=None):
        def jsonReplace(o):
            if isinstance(o, (map, Live.Base.FloatVector, Live.Base.IntVector, Live.Base.ObjectVector, Live.Base.StringVector, Live.Base.Vector)):
                return list(o)
            return str(o)

        data = None

        try:
            data = json.dumps(
                {"event": name, "data": obj, "uuid": uuid}, default=jsonReplace, ensure_ascii=False)
            self._sendto(data)
        except socket.error as e:
            self.log_message("Socket error: " + str(e.args) + ", server: " + str(self._server_addr) +
                             ", client: " + str(self._client_addr) + ", socket: " + str(self._socket))
            self.log_message("Data:" + data)
        except Exception as e:
            error = str(type(e).__name__) + ': ' + str(e.args)
            self.log_message("Error " + name + "(" + str(uuid) + "): " + error)

    def process(self):
        try:
            buffer = bytes()
            num_messages = 0
            while 1:
                data = self._socket.recv(65536)
                if len(data) and self.input_handler:
                    buffer += data[1:]
                    num_messages += 1

                    # \xFF for Live 10 (Python2) and 255 for Live 11 (Python3)
                    if (data[0] == b'\xFF' or data[0] == 255):
                        unzipped = zlib.decompress(buffer)
                        payload = json.loads(unzipped)
                        self.input_handler(payload)
                        buffer = bytes()
                        num_messages = 0
        except socket.error as e:
            if (e.errno != 35):
                self.log_message("Socket error: " + str(e.args))
            return
        except Exception as e:
            self.log_message("Error while processing: " + str(e.args))
