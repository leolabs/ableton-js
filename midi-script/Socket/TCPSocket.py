import socket
import hashlib
import base64
import contextlib
from threading import Thread
import zlib
import struct
import json

from Interfaces import SocketInterface, MessageHandlerInterface, HandshakeHandlerInterface
from ..Logging import logger
class WebsocketMessageHandler(MessageHandlerInterface):
    def receive_message(self, connection):
        try:
            complete_message = bytearray()
            while True:
                data = connection.recv(1024)
                if not data:
                    return None

                byte1, byte2 = struct.unpack('BB', data[:2])
                fin = byte1 & 0b10000000
                opcode = byte1 & 0b00001111
                masked = byte2 & 0b10000000
                payload_length = byte2 & 0b01111111

                if masked != 0b10000000:
                    logger.info('Client data must be masked')
                    return None

                if payload_length == 126:
                    extended_payload_length = data[2:4]
                    payload_length = int.from_bytes(extended_payload_length, byteorder='big')
                    masking_key = data[4:8]
                    payload_data = data[8:]
                elif payload_length == 127:
                    extended_payload_length = data[2:10]
                    payload_length = int.from_bytes(extended_payload_length, byteorder='big')
                    masking_key = data[10:14]
                    payload_data = data[14:]
                else:
                    masking_key = data[2:6]
                    payload_data = data[6:]

                decoded_bytes = bytearray()
                for i in range(payload_length):
                    decoded_bytes.append(payload_data[i] ^ masking_key[i % 4])

                complete_message.extend(decoded_bytes)

                if fin:
                    break

            if opcode == 0x1:  # Text frame
                return complete_message.decode('utf-8')
            elif opcode == 0x8:  # Connection close frame
                logger.info('Connection closed by client')
                return None
            else:
                logger.info(f'Unsupported frame type: {opcode}')
                return None
        except Exception as e:
            logger.error(f'Error receiving message: {e}')
            return None
        
    def send_message(self, connection, message):
        def json_replace(o):
            with contextlib.suppress(Exception):
                return list(o)
            return str(o)
        
        try:
            data = json.dumps(message, default=json_replace, ensure_ascii=False)
            # Compress the message using zlib
            compressed_message = zlib.compress(data.encode('utf-8'))

            # Create a frame
            frame = bytearray()
            fin = 0b10000000  # Final frame
            frame.append(fin | 0b00000010)  # Binary frame opcode

            length = len(compressed_message)
            if length <= 125:
                frame.append(length)
            elif length <= 65535:
                frame.append(126)
                frame.extend(struct.pack('!H', length))
            else:
                frame.append(127)
                frame.extend(struct.pack('!Q', length))

            # Append the compressed message to the frame
            frame.extend(compressed_message)

            # Send the framed message
            connection.sendall(frame)
        except Exception as e:
            logger.error(f'Error sending message: {e}')
            
class WebsocketHandshakeHandler(HandshakeHandlerInterface):
    def perform_handshake(self, connection):
            try:
                logger.info("Performing handshake...")
                request = connection.recv(1024).decode('utf-8')
                logger.info(f"Handshake request: {request}")

                headers = self._parse_headers(request)
                websocket_key = headers['Sec-WebSocket-Key']
                websocket_accept = self._generate_accept_key(websocket_key)

                response = (
                    'HTTP/1.1 101 Switching Protocols\r\n'
                    'Upgrade: websocket\r\n'
                    'Connection: Upgrade\r\n'
                    f'Sec-WebSocket-Accept: {websocket_accept}\r\n\r\n'
                )

                connection.send(response.encode('utf-8'))
                logger.info("Handshake response sent")
                return True
            except Exception as e:
                logger.error(f'Handshake error: {e}')
                return False

    def parse_headers(self, request):
        headers = {}
        lines = request.split('\r\n')
        for line in lines[1:]:
            if line:
                key, value = line.split(': ', 1)
                headers[key] = value
        return headers

    def generate_accept_key(self, websocket_key):
        magic_string = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
        return base64.b64encode(
            hashlib.sha1((websocket_key + magic_string).encode()).digest()
        ).decode('utf-8')

class Socket(SocketInterface, Thread):
    def __init__(self, on_message_callback, message_handler: MessageHandlerInterface, handshake_handler: HandshakeHandlerInterface):
        Thread.__init__(self)
        self._on_message_callback = on_message_callback
        self._message_handler = message_handler
        self._handshake_handler = handshake_handler
        self._socket = None
        self._connection = None

    def run(self):
        try:
            self._create_socket()
        except Exception as e:
            logger.error(f'Error creating socket: {e}')

    def _create_socket(self, start_port = 39031, end_port = 39038):
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        
        for port in range(start_port, end_port + 1):
            try:
                self._socket.bind(('', port))
                logger.info(f"Server started on port {port}, waiting for connections...")
                break
            except socket.error as e:
                logger.warning(f"Port {port} is unavailable: {e}")
                if port == end_port:
                    logger.error("No available ports in the specified range.")
                    return

        self._socket.listen(1)
        while True:
            connection, _ = self._socket.accept()
            if connection:
                self._connection = connection
                logger.info("Client connected")
                Thread(target=self._handle_connection, args=[connection]).start()

    def _handle_connection(self, connection):
        try:
            if self._handshake_handler.perform_handshake(connection):
                while True:
                    msg = self._message_handler.receive_message(connection)
                    if msg:
                        logger.info(f'Received message: {msg}')
                        self._on_message_callback(json.loads(msg))
                    else:
                        break
        except Exception as e:
            logger.error(f'Connection error: {e}')
        finally:
            connection.close()
            logger.info('Connection closed')

    def send(self, name, obj=None, uuid=None):
            message = {"event": name, "data": obj, "uuid": uuid}
            try:
                if self._connection:
                    self._message_handler.send_message(self._connection, message)
                else:
                    logger.info("Connection closed or invalid message")
            except Exception as e:
                logger.error(f'Error sending message: {e}')
            
    def shutdown(self):
        logger.info("Shutting down...")
        self._socket.close()
        self._socket = None

