from __future__ import absolute_import

import base64
import hashlib
import struct

WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
HANDSHAKE_MAX_BYTES = 16384
HANDSHAKE_RECV_SIZE = 4096

OPCODE_CONTINUATION = 0x0
OPCODE_TEXT = 0x1
OPCODE_CLOSE = 0x8
OPCODE_PING = 0x9
OPCODE_PONG = 0xA


def to_bytes(data):
    if data is None:
        return b""
    if isinstance(data, bytearray):
        return bytes(data)
    if isinstance(data, bytes):
        return data
    return data.encode("utf-8")


def to_text(data):
    if isinstance(data, bytes):
        return data.decode("utf-8")
    return data


def encode_frame(opcode, payload_bytes=b""):
    payload = to_bytes(payload_bytes)
    header = bytearray()
    header.append(0x80 | opcode)
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


def encode_text_frame(payload_bytes):
    return encode_frame(OPCODE_TEXT, payload_bytes)


def encode_pong_frame(payload_bytes):
    return encode_frame(OPCODE_PONG, payload_bytes)


def encode_close_frame():
    return encode_frame(OPCODE_CLOSE)


def handshake(conn):
    data = b""
    while b"\r\n\r\n" not in data:
        try:
            chunk = conn.recv(HANDSHAKE_RECV_SIZE)
        except OSError:
            return None
        if not chunk:
            return None
        data += to_bytes(chunk)
        if len(data) > HANDSHAKE_MAX_BYTES:
            return None

    header_blob, leftover = data.split(b"\r\n\r\n", 1)
    try:
        header_text = to_text(header_blob)
    except UnicodeDecodeError:
        return None

    headers = {}
    for line in header_text.split("\r\n")[1:]:
        if not line or ": " not in line:
            continue
        key, value = line.split(": ", 1)
        headers[key.strip().lower()] = value.strip()

    key = headers.get("sec-websocket-key")
    if not key:
        return None

    accept = base64.b64encode(hashlib.sha1(to_bytes(key + WS_GUID)).digest()).decode(
        "ascii"
    )

    response = (
        "HTTP/1.1 101 Switching Protocols\r\n"
        "Upgrade: websocket\r\n"
        "Connection: Upgrade\r\n"
        "Sec-WebSocket-Accept: " + accept + "\r\n\r\n"
    )

    try:
        conn.sendall(to_bytes(response))
    except OSError:
        return None

    return leftover


def try_read_frame(buffer):
    if len(buffer) < 2:
        return None

    b1 = buffer[0]
    b2 = buffer[1]
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
        apply_mask(payload, mask)

    del buffer[: index + length]
    return opcode, (b1 & 0x80) != 0, payload


def apply_mask(payload, mask):
    """XOR a WebSocket payload with its 4-byte mask.

    Client frames are always masked. A byte-at-a-time loop is too slow for
    multi-megabyte messages (e.g. song.set_data with a large array).
    """
    n = len(payload)
    if n == 0:
        return payload

    mask_bytes = bytes(bytearray(mask)[:4])
    if len(mask_bytes) < 4:
        return payload
    chunk = 8192
    i = 0
    while i < n:
        j = min(i + chunk, n)
        slen = j - i
        offset = i % 4
        key = (mask_bytes * ((offset + slen) // 4 + 1))[offset : offset + slen]
        src = int.from_bytes(payload[i:j], "little")
        payload[i:j] = (src ^ int.from_bytes(key, "little")).to_bytes(slen, "little")
        i = j
    return payload
