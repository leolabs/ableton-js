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

client_port_path = os.path.join(tempfile.gettempdir(), client_port_file)
server_port_path = os.path.join(tempfile.gettempdir(), server_port_file)


class Socket(object):

    @staticmethod
    def set_log(func):
        Socket.log_message = func

    @staticmethod
    def set_message(func):
        Socket.show_message = func

    def __init__(self, handler):
        self.input_handler = handler
        self._server_addr = ('127.0.0.1', 0)
        self._client_addr = ('127.0.0.1', 39031)
        self.remote_port_file = None
        self.read_remote_port()
        self.init_socket()

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
            if self.remote_port_file == None or self.remote_port_file.closed:
                self.log_message("Opening remote port file...")
                self.remote_port_file = open(client_port_path)

            self.remote_port_file.seek(0)
            port = int(self.remote_port_file.read())

            if port != self._client_addr[1]:
                self.log_message("Client port changed: " + str(port))
                self._client_addr = ('127.0.0.1', port)

                if hasattr(self, "_socket"):
                    self.send("connect", {"port": self._server_addr[1]})
        except Exception as e:
            self.log_message("Couldn't read remote port:", str(e.args))
            if self.remote_port_file:
                self.remote_port_file.close()

        Timer(1, self.read_remote_port).start()

    def init_socket(self):
        self._socket = socket.socket(
            socket.AF_INET, socket.SOCK_DGRAM)
        self._socket.setblocking(0)

        self.bind(True)

    def shutdown(self):
        self._socket.close()
        if self.remote_port_file:
            self.remote_port_file.close()

    def bind(self, try_stored=False):
        try:
            stored_port = self.read_last_server_port()

            # Try the port we used last time first
            if try_stored and stored_port:
                self._server_addr = ("127.0.0.1", stored_port)
            else:
                self._server_addr = ("127.0.0.1", 0)

            self._socket.bind(self._server_addr)
            port = self._socket.getsockname()[1]

            # Write the chosen port to a file
            if stored_port != port:
                with open(server_port_path, "w") as file:
                    file.write(str(port))

            self.send("connect", {"port": port})
            self.show_message("Started server on port " + str(port))

            self.log_message('Started on: ' + str(self._socket.getsockname()) +
                             ', remote addr: ' + str(self._client_addr))
        except Exception as e:
            msg = 'ERROR: Cannot bind to ' + \
                str(self._server_addr) + ': ' + \
                str(e.args) + ', trying again. ' + \
                'If this keeps happening, try restarting your computer.'
            self.show_message(msg)
            self.log_message(msg)
            t = Timer(5, self.bind)
            t.start()

    def _sendto(self, msg):
        '''Send a raw message to the client, compressed and chunked, if necessary'''
        compressed = zlib.compress(msg.encode("utf8")) + b'\n'
        # Based on this thread, 7500 bytes seems like a safe value
        # https://stackoverflow.com/questions/22819214/udp-message-too-long
        limit = 7500

        if len(compressed) < limit:
            self._socket.sendto(b'\xFF' + compressed, self._client_addr)
        else:
            chunks = list(split_by_n(compressed, limit))
            count = len(chunks)
            for i, chunk in enumerate(chunks):
                count_byte = struct.pack("B", i if i + 1 < count else 255)
                self._socket.sendto(count_byte + chunk, self._client_addr)

    def send(self, name, obj=None, uuid=None):
        def jsonReplace(o):
            if isinstance(o, (map, Live.Base.FloatVector, Live.Base.IntVector, Live.Base.ObjectVector, Live.Base.StringVector, Live.Base.Vector)):
                return list(o)
            return str(o)

        try:
            self._sendto(json.dumps(
                {"event": name, "data": obj, "uuid": uuid}, default=jsonReplace, ensure_ascii=False))
        except socket.error as e:
            self.log_message("Socket error: " + str(e.args))
            self.log_message("Server: " + str(self._server_addr) +
                             ", client: " + str(self._client_addr))
            self.log_message("Restarting socket...")
            self._socket.close()
            self.init_socket()
        except Exception as e:
            error = str(type(e).__name__) + ': ' + str(e.args)
            self.log_message("Error " + name + "(" + str(uuid) + "): " + error)

    def process(self):
        try:
            buffer = bytes()
            num_messages = 0
            while 1:
                data = self._socket.recv(8192)
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
            return
        except Exception as e:
            self.log_message("Error while processing: " + str(e.args))
