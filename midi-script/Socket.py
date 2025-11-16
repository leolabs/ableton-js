import socket
import json
import struct
import zlib
import os
import tempfile
import sys

from .Logging import logger

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
    def set_message(func):
        Socket.show_message = func

    def __init__(self, handler):
        self.input_handler = handler
        self._server_addr = ("127.0.0.1", 0)
        self._client_addr = ("127.0.0.1", 39031)
        self._last_error = ""
        self._socket = None
        self._chunk_limit = None
        self._message_id = 0
        self._receive_buffer = bytearray()

        self.read_remote_port()
        self.init_socket(True)

    def log_error_once(self, msg):
        if self._last_error != msg:
            self._last_error = msg
            logger.error(msg)

    def set_client_port(self, port):
        logger.info("Setting client port: " + str(port))
        self.show_message("Client connected on port " + str(port))
        self._client_addr = ("127.0.0.1", int(port))

    def read_last_server_port(self):
        try:
            with open(server_port_path) as file:
                port = int(file.read())

            logger.info("Stored server port: " + str(port))
            return port
        except Exception as e:
            logger.error("Couldn't read stored server port:")
            logger.exception(e)
            return None

    def read_remote_port(self):
        '''Reads the port our client is listening on'''

        try:
            os.stat(client_port_path)
        except Exception as e:
            self.log_error_once("Couldn't stat remote port file:")
            return

        try:
            old_port = self._client_addr[1]

            with open(client_port_path) as file:
                port = int(file.read())

                if port != old_port:
                    logger.info("[" + str(id(self)) + "] Client port changed from " +
                                str(old_port) + " to " + str(port))
                    self._client_addr = ("127.0.0.1", port)

                    if self._socket:
                        self.send("connect", {"port": self._server_addr[1]})
        except Exception as e:
            self.log_error_once(
                "Couldn't read remote port file: " + str(e.args))

    def shutdown(self):
        logger.info("Shutting down...")
        self._socket.close()
        self._socket = None

    def init_socket(self, try_stored=False):
        logger.info(
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

            # Get the chunk limit of the socket, minus 100 for some headroom
            self._chunk_limit = self._socket.getsockopt(
                socket.SOL_SOCKET, socket.SO_SNDBUF) - 100

            logger.info("Chunk limit: " + str(self._chunk_limit))

            # Write the chosen port to a file
            try:
                if stored_port != port:
                    with open(server_port_path, "w") as file:
                        file.write(str(port))
            except Exception as e:
                self.log_error_once(
                    "Couldn't save port in file: " + str(e.args))
                raise e

            try:
                self.send("connect", {"port": self._server_addr[1]})
            except Exception as e:
                logger.error("Couldn't send connect to " +
                             str(self._client_addr) + ":")
                logger.exception(e)

            self.show_message("Started server on port " + str(port))

            logger.info('Started server on: ' + str(self._socket.getsockname()) +
                        ', client addr: ' + str(self._client_addr))
        except Exception as e:
            msg = 'ERROR: Cannot bind to ' + \
                str(self._server_addr) + ': ' + \
                str(e.args) + ', trying again. ' + \
                'If this keeps happening, try restarting your computer.'
            self.log_error_once(
                msg + " (Client address: " + str(self._client_addr) + ")")
            self.show_message(msg)
            t = Live.Base.Timer(
                callback=self.init_socket, interval=5000, repeat=False)
            t.start()

    def _sendto(self, msg):
        '''Send a raw message to the client, compressed and chunked, if necessary'''
        compressed = zlib.compress(msg.encode("utf8")) + b'\n'

        if self._socket == None or self._chunk_limit == None:
            return

        self._message_id = (self._message_id + 1) % 256
        message_id_byte = struct.pack("B", self._message_id)

        if len(compressed) < self._chunk_limit:
            self._socket.sendto(
                message_id_byte + b'\x00\x01' + compressed, self._client_addr)
        else:
            chunks = list(split_by_n(compressed, self._chunk_limit))
            count = len(chunks)
            count_byte = struct.pack("B", count)
            for i, chunk in enumerate(chunks):
                packet_byte = struct.pack("B", i)
                self._socket.sendto(
                    message_id_byte + packet_byte + count_byte + chunk, self._client_addr)

    def send(self, name, obj=None, uuid=None):
        def jsonReplace(o):
            try:
                return list(o)
            except:
                pass

            return str(o)

        data = None

        try:
            data = json.dumps(
                {"event": name, "data": obj, "uuid": uuid}, default=jsonReplace, ensure_ascii=False)
            self._sendto(data)
        except socket.error as e:
            logger.error("Socket error:")
            logger.exception(e)
            logger.error("Server: " + str(self._server_addr) + ", client: " +
                         str(self._client_addr) + ", socket: " + str(self._socket))
            logger.error("Data:" + data)
        except Exception as e:
            logger.error("Error " + name + "(" + str(uuid) + "):")
            logger.exception(e)

    def process(self):
        try:
            while 1:
                data = self._socket.recv(65536)
                if len(data) and self.input_handler:
                    self._receive_buffer.extend(data[1:])

                    # \xFF for Live 10 (Python2) and 255 for Live 11 (Python3)
                    if (data[0] == b'\xFF' or data[0] == 255):
                        packet = self._receive_buffer
                        self._receive_buffer = bytearray()

                        # Handle Python 2/3 compatibility for zlib.decompress
                        if sys.version_info[0] < 3:
                            packet = str(packet)

                        unzipped = zlib.decompress(packet)

                        # Handle bytes to string conversion for Python 3
                        if sys.version_info[0] >= 3 and isinstance(unzipped, bytes):
                            unzipped = unzipped.decode('utf-8')

                        payload = json.loads(unzipped)
                        self.input_handler(payload)

        except socket.error as e:
            if (e.errno != 35 and e.errno != 10035 and e.errno != 10054 and e.errno != 10022):
                logger.error("Socket error:")
                logger.exception(e)
            return
        except Exception as e:
            logger.error("Error processing request:")
            logger.exception(e)
