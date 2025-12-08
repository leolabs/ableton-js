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
        self._send_buffer = []
        self._message_id = 0
        self._receive_buffer = bytearray()
        # Dictionary to store chunks per message: {message_id: {chunk_index: chunk_data}}
        self._chunks = {}

        self.read_remote_port()
        self.init_socket()

    def log_error_once(self, msg):
        if self._last_error != msg:
            self._last_error = msg
            logger.error(msg)

    def set_client_port(self, port):
        logger.info("Setting client port: " + str(port))
        self.show_message("Client connected on port " + str(port))
        self._client_addr = ("127.0.0.1", int(port))

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
                        self.send(
                            "connect", {"port": self._server_addr[1]}, immediate=True)
        except Exception as e:
            self.log_error_once(
                "Couldn't read remote port file: " + str(e.args))

    def shutdown(self):
        logger.info("Shutting down...")
        send_buffer_length = len(self._send_buffer)

        for i, packet in enumerate(self._send_buffer):
            logger.info("Sending remaining packet " + str(i) +
                        " of " + str(send_buffer_length))
            self._socket.sendto(packet, self._client_addr)

        self._send_buffer.clear()
        self._socket.close()
        self._socket = None

    def init_socket(self):
        logger.info("Initializing socket")

        try:
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
                with open(server_port_path, "w") as file:
                    file.write(str(port))
            except Exception as e:
                self.log_error_once(
                    "Couldn't save port in file: " + str(e.args))
                raise e

            try:
                self.send("connect", {"port": port}, immediate=True)
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

    def _sendto(self, msg, immediate):
        '''Send a raw message to the client, compressed and chunked, if necessary'''
        compressed = zlib.compress(msg.encode("utf8")) + b'\n'

        if self._socket == None or self._chunk_limit == None:
            return

        self._message_id = (self._message_id + 1) % 256
        message_id_byte = struct.pack("B", self._message_id)

        if len(compressed) < self._chunk_limit:
            packet = message_id_byte + b'\x00\x01' + compressed

            if immediate:
                self._socket.sendto(packet, self._client_addr)
            else:
                self._send_buffer.append(packet)
        else:
            chunks = list(split_by_n(compressed, self._chunk_limit))
            count = len(chunks)
            count_byte = struct.pack("B", count)
            for i, chunk in enumerate(chunks):
                packet_byte = struct.pack("B", i)
                self._send_buffer.append(
                    message_id_byte + packet_byte + count_byte + chunk)

    def send(self, name, obj=None, uuid=None, immediate=False):
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
            self._sendto(data, immediate)
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
                try:
                    # Send 5 UDP packets at a time, to avoid
                    for i in range(5):
                        self._socket.sendto(
                            self._send_buffer.pop(0), self._client_addr)
                except:
                    pass

                data = self._socket.recv(65536)
                if len(data) and self.input_handler:
                    # Parse packet format: [messageId][chunkIndex][totalChunks][chunkData]
                    if len(data) < 3:
                        # Packet too short, skip it
                        continue

                    # Get message ID, chunk index, and total chunks from first 3 bytes
                    message_id = data[0]
                    chunk_index = data[1]
                    total_chunks = data[2]

                    # Handle Python 2/3 compatibility
                    if isinstance(message_id, bytes):
                        message_id = ord(message_id)
                    if isinstance(chunk_index, bytes):
                        chunk_index = ord(chunk_index)
                    if isinstance(total_chunks, bytes):
                        total_chunks = ord(total_chunks)

                    chunk_data = data[3:]

                    # Initialize message tracking if this is the first chunk for this message
                    if message_id not in self._chunks:
                        self._chunks[message_id] = {}

                    # Store the chunk
                    self._chunks[message_id][chunk_index] = chunk_data

                    # Check if we have all chunks for this message
                    if len(self._chunks[message_id]) == total_chunks:
                        # We have all chunks! Reassemble in order
                        packet_parts = []
                        for i in range(total_chunks):
                            if i in self._chunks[message_id]:
                                packet_parts.append(
                                    self._chunks[message_id][i])
                            else:
                                # Missing chunk - this shouldn't happen if total_chunks is correct
                                logger.error(
                                    "Missing chunk %d for message %d" % (i, message_id))
                                break
                        else:
                            # All chunks present, reassemble
                            packet = b''.join(packet_parts)

                            # Remove this message from tracking
                            del self._chunks[message_id]

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
            # Clear chunks on error to prevent stuck state
            # Optionally, we could clear only the problematic message_id, but for safety, clear all
            self._chunks = {}
