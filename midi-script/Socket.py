from __future__ import absolute_import
import socket
import json
import struct
import sys
import hashlib
import base64
import threading

from .Config import PLUGIN_NAME, WEBSOCKET_HOST, WEBSOCKET_PORT
from .Logging import logger

try:
    import Queue as queue
except ImportError:
    import queue

import time

WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"


def _byte_at(data, index):
    value = data[index]
    if isinstance(value, int):
        return value
    return ord(value)


def _to_bytes(data):
    if data is None:
        return b""
    if isinstance(data, bytearray):
        return bytes(data)
    if sys.version_info[0] >= 3:
        if isinstance(data, bytes):
            return data
        return data.encode("utf-8")
    if isinstance(data, unicode):
        return data.encode("utf-8")
    return data


def _to_text(data):
    if sys.version_info[0] >= 3:
        if isinstance(data, bytes):
            return data.decode("utf-8")
        return data
    if isinstance(data, unicode):
        return data
    return data.decode("utf-8")


def encode_text_frame(payload_bytes):
    payload = _to_bytes(payload_bytes)
    header = bytearray()
    header.append(0x81)
    length = len(payload)
    if length < 126:
        header.append(length)
    elif length < 65536:
        header.append(126)
        header.extend(struct.pack("!H", length))
    else:
        header.append(127)
        header.extend(struct.pack("!Q", length))
    return bytes(header) + payload


def encode_pong_frame(payload_bytes):
    payload = _to_bytes(payload_bytes)
    header = bytearray()
    header.append(0x8A)
    length = len(payload)
    if length < 126:
        header.append(length)
    elif length < 65536:
        header.append(126)
        header.extend(struct.pack("!H", length))
    else:
        header.append(127)
        header.extend(struct.pack("!Q", length))
    return bytes(header) + payload


def encode_close_frame():
    return b"\x88\x00"


class Socket(object):
    @staticmethod
    def set_message(func):
        Socket.show_message = func

    def __init__(self, handler):
        self.input_handler = handler
        self._queue = queue.Queue()
        self._connections = []
        self._lock = threading.Lock()
        self._socket = None
        self._running = True
        self._last_error = ""
        self._host = WEBSOCKET_HOST
        self._port = int(WEBSOCKET_PORT)

        self._thread = threading.Thread(target=self._serve)
        self._thread.daemon = True
        self._thread.start()

    def log_error_once(self, msg):
        if self._last_error != msg:
            self._last_error = msg
            logger.error(msg)

    def send(self, name, obj=None, uuid=None, immediate=False):
        def jsonReplace(o):
            try:
                return list(o)
            except Exception:
                pass
            return str(o)

        try:
            data = json.dumps(
                {"event": name, "data": obj, "uuid": uuid},
                default=jsonReplace,
                ensure_ascii=False,
            )
            frame = encode_text_frame(_to_bytes(data))
            self._send_frame(frame)
        except Exception as e:
            logger.error("Error " + name + "(" + str(uuid) + "):")
            logger.exception(e)

    def _send_frame(self, frame, connection=None):
        targets = [connection] if connection is not None else list(self._connections)
        with self._lock:
            for conn in targets:
                try:
                    conn.sendall(frame)
                except Exception:
                    self._drop_connection(conn)

    def _drop_connection(self, conn):
        try:
            self._connections.remove(conn)
        except Exception:
            pass
        try:
            conn.close()
        except Exception:
            pass

    def shutdown(self):
        logger.info("Shutting down...")
        self._running = False
        with self._lock:
            for conn in list(self._connections):
                try:
                    conn.sendall(encode_close_frame())
                except Exception:
                    pass
                try:
                    conn.close()
                except Exception:
                    pass
            self._connections = []
        if self._socket:
            try:
                self._socket.close()
            except Exception:
                pass
            self._socket = None

    def process(self):
        while True:
            try:
                payload = self._queue.get_nowait()
            except queue.Empty:
                return
            try:
                if self.input_handler:
                    self.input_handler(payload)
            except Exception as e:
                logger.error("Error processing request:")
                logger.exception(e)

    def _serve(self):
        while self._running:
            try:
                self._bind_and_listen()
                self._accept_loop()
            except Exception as e:
                if not self._running:
                    return
                msg = (
                    "ERROR: Cannot bind to %s:%s: %s, trying again. If this keeps happening, try restarting your computer."
                    % (self._host, self._port, e.args)
                )
                self.log_error_once(msg)
                self.show_message(msg)
                if self._socket:
                    try:
                        self._socket.close()
                    except Exception:
                        pass
                    self._socket = None
                time.sleep(5)

    def _bind_and_listen(self):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
        except Exception:
            pass
        sock.bind((self._host, self._port))
        sock.listen(16)
        self._socket = sock
        self._last_error = ""
        logger.info("WebSocket server listening on %s:%s" % (self._host, self._port))
        self.show_message("Started %s on %s:%s" % (PLUGIN_NAME, self._host, self._port))

    def _accept_loop(self):
        while self._running and self._socket:
            try:
                conn, addr = self._socket.accept()
            except socket.error:
                if not self._running:
                    return
                continue
            try:
                conn.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
            except Exception:
                pass
            logger.info("Client connected: " + str(addr))
            thread = threading.Thread(target=self._handle_connection, args=(conn,))
            thread.daemon = True
            thread.start()

    def _handle_connection(self, conn):
        leftover = self._handshake(conn)
        if leftover is None:
            try:
                conn.close()
            except Exception:
                pass
            return

        with self._lock:
            self._connections.append(conn)

        self.send("connect", {"port": self._port})

        buffer = bytearray(_to_bytes(leftover))
        fragments = bytearray()
        fragment_opcode = None

        try:
            while self._running:
                try:
                    data = conn.recv(65536)
                except socket.error:
                    break
                if not data:
                    break
                buffer.extend(bytearray(_to_bytes(data)))

                while True:
                    frame = self._try_read_frame(buffer)
                    if frame is None:
                        break
                    opcode, fin, payload = frame

                    if opcode == 0x8:
                        try:
                            conn.sendall(encode_close_frame())
                        except Exception:
                            pass
                        return
                    if opcode == 0x9:
                        self._send_frame(encode_pong_frame(payload), conn)
                        continue
                    if opcode == 0xA:
                        continue

                    if opcode == 0x0:
                        if fragment_opcode is None:
                            continue
                        fragments.extend(payload)
                        if fin:
                            self._handle_payload(fragment_opcode, fragments)
                            fragments = bytearray()
                            fragment_opcode = None
                        continue

                    if not fin:
                        fragment_opcode = opcode
                        fragments = bytearray(payload)
                        continue

                    self._handle_payload(opcode, payload)
        except Exception as e:
            logger.error("Connection error:")
            logger.exception(e)
        finally:
            with self._lock:
                self._drop_connection(conn)
            logger.info("Client disconnected")

    def _handle_payload(self, opcode, payload):
        if opcode != 0x1:
            return
        try:
            text = _to_text(bytes(payload))
            parsed = json.loads(text)
        except Exception as e:
            logger.error("Error decoding request:")
            logger.exception(e)
            return
        self._queue.put(parsed)

    def _handshake(self, conn):
        data = b""
        while b"\r\n\r\n" not in data:
            try:
                chunk = conn.recv(4096)
            except socket.error:
                return None
            if not chunk:
                return None
            data += _to_bytes(chunk)
            if len(data) > 16384:
                return None

        header_blob, leftover = data.split(b"\r\n\r\n", 1)
        try:
            header_text = _to_text(header_blob)
        except Exception:
            return None

        headers = {}
        lines = header_text.split("\r\n")
        for line in lines[1:]:
            if not line or ": " not in line:
                continue
            key, value = line.split(": ", 1)
            headers[key.strip().lower()] = value.strip()

        key = headers.get("sec-websocket-key")
        if not key:
            return None

        accept_src = _to_bytes(key + WS_GUID)
        accept = base64.b64encode(hashlib.sha1(accept_src).digest())
        if sys.version_info[0] >= 3:
            accept = accept.decode("ascii")

        response = (
            "HTTP/1.1 101 Switching Protocols\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            "Sec-WebSocket-Accept: " + accept + "\r\n\r\n"
        )
        try:
            conn.sendall(_to_bytes(response))
        except Exception:
            return None
        return leftover

    def _try_read_frame(self, buffer):
        if len(buffer) < 2:
            return None

        b1 = _byte_at(buffer, 0)
        b2 = _byte_at(buffer, 1)
        opcode = b1 & 0x0F
        masked = (b2 & 0x80) != 0
        length = b2 & 0x7F
        index = 2

        if length == 126:
            if len(buffer) < 4:
                return None
            length = struct.unpack("!H", bytes(buffer[2:4]))[0]
            index = 4
        elif length == 127:
            if len(buffer) < 10:
                return None
            length = struct.unpack("!Q", bytes(buffer[2:10]))[0]
            index = 10

        mask = None
        if masked:
            if len(buffer) < index + 4:
                return None
            mask = buffer[index : index + 4]
            index += 4

        if len(buffer) < index + length:
            return None

        payload = bytearray(buffer[index : index + length])
        if mask is not None:
            for i in range(len(payload)):
                payload[i] = payload[i] ^ _byte_at(mask, i % 4)

        del buffer[: index + length]
        fin = (b1 & 0x80) != 0
        return opcode, fin, payload
