import socket
import hashlib
import base64
from threading import Thread
import zlib
import struct
import ast
from .Logging import logger

class Socket(Thread):
    def __init__(self, c_instance, on_message_callback):
        Thread.__init__(self)
        self._c_instance = c_instance
        self._on_message_callback = on_message_callback
        self.connection = None
        

    def run(self):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            sock.bind(('', 5558))
            logger.info("Server started, waiting for connections...")
            sock.listen(1)
            while True:
                connection, _ = sock.accept()
                if connection:
                    self.connection = connection
                    logger.info("Client connected")
                    Thread(target=self.handle_connection, args=[connection]).start()
        except Exception as e:
            logger.error(f'Run error: {e}')
        finally:
            if self.connection:
                self.connection.close()
                logger.info('Server socket closed')

    def handle_connection(self, connection):
        try:
            if self.perform_handshake(connection):
                while True:
                    msg = self.receive_message(connection)
                    if msg:
                        logger.info(f'Received message: {msg}')
                        self._on_message_callback(ast.literal_eval(msg))
                        
                    else:
                        break
        except Exception as e:
            logger.error(f'Connection error: {e}')
        finally:
            connection.close()
            logger.info('Connection closed')

    def perform_handshake(self, connection):
        try:
            logger.info("Performing handshake...")
            request = connection.recv(1024).decode('utf-8')
            logger.info(f"Handshake request: {request}")

            headers = self.parse_headers(request)
            websocket_key = headers['Sec-WebSocket-Key']
            websocket_accept = self.generate_accept_key(websocket_key)

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
        accept_key = base64.b64encode(hashlib.sha1((websocket_key + magic_string).encode()).digest()).decode('utf-8')
        return accept_key

    def receive_message(self, connection):
        try:
            data = connection.recv(1024)
            if not data:
                return None

            byte1, byte2 = struct.unpack('BB', data[:2])
            fin = byte1 & 0b10000000
            opcode = byte1 & 0b00001111
            masked = byte2 & 0b10000000
            payload_length = byte2 & 0b01111111

            if masked != 0b10000000:
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

            if opcode == 0x1:  # Text frame
                return decoded_bytes.decode('utf-8')
            elif opcode == 0x8:  # Connection close frame
                logger.info('Connection closed by client')
                return None
            else:
                logger.warning(f'Unsupported frame type: {opcode}')
                return None
        except Exception as e:
            logger.error(f'Error receiving message: {e}')
            return None

    def send(self, message):
        try:
            if self.connection and isinstance(message, str):
                # Compress the message using zlib
                compressed_message = zlib.compress(message.encode('utf-8'))

                # Determine chunk size based on network conditions
                max_chunk_size = 8096  # Adjust as needed

                # Split the compressed message into smaller chunks
                chunks = [compressed_message[i:i+max_chunk_size] for i in range(0, len(compressed_message), max_chunk_size)]

                for chunk in chunks:
                    frame = bytearray()
                    frame.append(0b10000010)  # Binary frame opcode

                    length = len(chunk)
                    if length <= 125:
                        frame.append(length)
                    elif length <= 65535:
                        frame.append(126)
                        frame.extend(struct.pack('!H', length))
                    else:
                        frame.append(127)
                        frame.extend(struct.pack('!Q', length))

                    # Append the chunk to the frame
                    frame.extend(chunk)

                    # Send the framed chunk
                    self.connection.sendall(frame)
            else:
                logger.warning("Connection closed or invalid message")
        except Exception as e:
            logger.error(f'Error sending message: {e}')
            


