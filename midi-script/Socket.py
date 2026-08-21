from __future__ import absolute_import
import binascii
import hashlib
import hmac
import os
import socket
import json
import threading
import time

from .Config import PLUGIN_NAME, WEBSOCKET_HOST, WEBSOCKET_PORT, PASSWORD
from .Logging import logger
from .WebSocket import (
    OPCODE_CLOSE,
    OPCODE_CONTINUATION,
    OPCODE_PING,
    OPCODE_PONG,
    OPCODE_TEXT,
    encode_close_frame,
    encode_pong_frame,
    encode_text_frame,
    handshake,
    to_bytes,
    to_text,
    try_read_frame,
)

try:
    import Queue as queue
except ImportError:
    import queue

# Send small frames on the caller thread (usually Live's MIDI thread). A
# dedicated send thread adds ~10ms wake-up on macOS; keep it only for large
# payloads or when a previous send is still queued.
DIRECT_SEND_MAX_BYTES = 65536
EAGAIN_ERRNOS = (11, 35, 10035)


def _auth_enabled():
    return bool(PASSWORD)


def _random_salt():
    raw = binascii.hexlify(os.urandom(16))
    if isinstance(raw, bytes):
        return raw.decode("ascii")
    return raw


def _auth_hash(salt):
    return hmac.new(to_bytes(PASSWORD), to_bytes(salt), hashlib.sha256).hexdigest()


class ClientConnection(object):
    """Socket with optional send thread for large or potentially blocking writes."""

    def __init__(self, sock):
        self.sock = sock
        self.out_queue = queue.Queue()
        self._send_lock = threading.Lock()
        self._closed = False
        self.authenticated = not _auth_enabled()
        self.auth_salt = None
        thread = threading.Thread(target=self._send_loop)
        thread.daemon = True
        thread.start()

    def send_or_enqueue(self, frame):
        if self._closed:
            return False
        if self.out_queue.empty() and len(frame) <= DIRECT_SEND_MAX_BYTES:
            if self._send_lock.acquire(False):
                try:
                    if self._closed:
                        return False
                    self.sock.sendall(frame)
                    return True
                except socket.error as e:
                    errno = getattr(e, "errno", None)
                    if errno not in EAGAIN_ERRNOS:
                        return False
                finally:
                    self._send_lock.release()
        return self.enqueue(frame)

    def enqueue(self, frame):
        if self._closed:
            return False
        self.out_queue.put_nowait(frame)
        return True

    def close(self):
        if self._closed:
            return
        self._closed = True
        try:
            self.out_queue.put_nowait(None)
        except Exception:
            pass
        try:
            self.sock.close()
        except Exception:
            pass

    def _send_loop(self):
        while True:
            frame = self.out_queue.get()
            if frame is None:
                break
            try:
                self._send_lock.acquire()
                try:
                    if self._closed:
                        break
                    self.sock.sendall(frame)
                finally:
                    self._send_lock.release()
            except Exception:
                break
        try:
            self.sock.close()
        except Exception:
            pass


class Socket(object):
    @staticmethod
    def set_message(func):
        Socket.show_message = func

    def __init__(self, handler, disconnect_handler=None):
        self.input_handler = handler
        self.disconnect_handler = disconnect_handler
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

    def send_to(self, connection, name, obj=None, uuid=None):
        self._send_json(name, obj, uuid, connection)

    def broadcast(self, name, obj=None, uuid=None):
        self._send_json(name, obj, uuid, None)

    def _send_json(self, name, obj, uuid, connection):
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
            frame = encode_text_frame(to_bytes(data))
            if connection is None:
                self._broadcast_frame(frame)
            else:
                self._send_frame(frame, connection)
        except Exception as e:
            logger.error("Error " + name + "(" + str(uuid) + "):")
            logger.exception(e)

    def _send_frame(self, frame, connection):
        self._deliver_frame(frame, [connection])

    def _broadcast_frame(self, frame):
        with self._lock:
            targets = list(self._connections)
        self._deliver_frame(frame, targets)

    def _deliver_frame(self, frame, targets):
        stale = []
        for conn in targets:
            if not conn.send_or_enqueue(frame):
                stale.append(conn)

        if stale:
            with self._lock:
                for conn in stale:
                    self._drop_connection(conn)

    def _drop_connection(self, conn):
        try:
            self._connections.remove(conn)
        except Exception:
            pass
        conn.close()
        # Live listener teardown must run on the main thread via process().
        try:
            self._queue.put((conn, None))
        except Exception:
            pass

    def shutdown(self):
        logger.info("Shutting down...")
        self._running = False
        with self._lock:
            clients = list(self._connections)
            self._connections = []
        for conn in clients:
            conn.enqueue(encode_close_frame())
            conn.close()
        if self._socket:
            try:
                self._socket.close()
            except Exception:
                pass
            self._socket = None

    def process(self):
        while True:
            try:
                connection, payload = self._queue.get_nowait()
            except queue.Empty:
                return
            try:
                if payload is None:
                    if self.disconnect_handler:
                        self.disconnect_handler(connection)
                elif self.input_handler:
                    self.input_handler(payload, connection)
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
        leftover = handshake(conn)
        if leftover is None:
            try:
                conn.close()
            except Exception:
                pass
            return

        client = ClientConnection(conn)
        with self._lock:
            self._connections.append(client)

        connect_data = {"port": self._port}
        if _auth_enabled():
            client.auth_salt = _random_salt()
            connect_data["requiresAuth"] = True
            connect_data["salt"] = client.auth_salt
        self.send_to(client, "connect", connect_data)

        buffer = bytearray(to_bytes(leftover))
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
                buffer.extend(bytearray(to_bytes(data)))

                while True:
                    frame = try_read_frame(buffer)
                    if frame is None:
                        break
                    opcode, fin, payload = frame

                    if opcode == OPCODE_CLOSE:
                        client.enqueue(encode_close_frame())
                        return
                    if opcode == OPCODE_PING:
                        self._send_frame(encode_pong_frame(payload), client)
                        continue
                    if opcode == OPCODE_PONG:
                        continue

                    if opcode == OPCODE_CONTINUATION:
                        if fragment_opcode is None:
                            continue
                        fragments.extend(payload)
                        if fin:
                            self._handle_payload(fragment_opcode, fragments, client)
                            fragments = bytearray()
                            fragment_opcode = None
                        continue

                    if not fin:
                        fragment_opcode = opcode
                        fragments = bytearray(payload)
                        continue

                    self._handle_payload(opcode, payload, client)
        except Exception as e:
            logger.error("Connection error:")
            logger.exception(e)
        finally:
            with self._lock:
                self._drop_connection(client)
            logger.info("Client disconnected")

    def _handle_payload(self, opcode, payload, client):
        if opcode != OPCODE_TEXT:
            return
        try:
            text = to_text(bytes(payload))
            parsed = json.loads(text)
        except Exception as e:
            logger.error("Error decoding request:")
            logger.exception(e)
            return

        if self._gate_auth(client, parsed):
            return

        self._queue.put((client, parsed))

    def _gate_auth(self, client, parsed):
        """Return True if the message was consumed and should not be queued."""
        if not _auth_enabled() or client.authenticated:
            return False

        uuid = parsed.get("uuid")
        commands = parsed.get("commands")
        if not isinstance(commands, list) or len(commands) == 0:
            self.send_to(client, "error", "Unauthorized", uuid)
            return True

        first = commands[0] or {}
        if first.get("ns") != "internal" or first.get("name") != "authenticate":
            self.send_to(client, "error", "Unauthorized", uuid)
            return True

        args = first.get("args") or {}
        if client.auth_salt and args.get("hash") == _auth_hash(client.auth_salt):
            client.authenticated = True
            logger.info("Client authenticated")
            return False

        logger.info("Client authentication failed")
        self.send_to(client, "error", "Invalid password", uuid)
        with self._lock:
            self._drop_connection(client)
        return True
