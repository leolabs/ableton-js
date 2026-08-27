
import mimetypes
import os
from urllib.parse import unquote

from .Logging import logger
from .WebSocket import to_bytes

STATIC_ROOT = os.path.realpath(os.path.join(os.path.dirname(__file__), "static"))

mimetypes.add_type("text/html", ".html")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/json", ".json")
mimetypes.add_type("application/json", ".map")
mimetypes.add_type("application/wasm", ".wasm")
mimetypes.add_type("image/svg+xml", ".svg")

_STATUS_TEXT = {
    200: "OK",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
}


def serve_static(conn, method, path):
    """Serve a GET/HEAD request from STATIC_ROOT. Returns the HTTP status code."""
    method = (method or "").upper()
    if method not in ("GET", "HEAD"):
        return _send_error(conn, 405, method, path)

    local_path, error = _resolve_path(path)
    if error is not None:
        return _send_error(conn, error, method, path)

    try:
        with open(local_path, "rb") as f:
            body = f.read()
    except OSError:
        return _send_error(conn, 404, method, path)

    content_type = mimetypes.guess_type(local_path)[0] or "application/octet-stream"
    if content_type.startswith("text/") and "charset=" not in content_type:
        content_type += "; charset=utf-8"

    status = 200
    _send_response(
        conn,
        status,
        content_type,
        body if method == "GET" else b"",
        content_length=len(body),
    )
    logger.debug(f"{method} {path} -> {status}")
    return status


def _resolve_path(request_path):
    """Map a URL path to a file under STATIC_ROOT.

    Returns (local_path, None) on success, or (None, status_code) on failure.
    """
    # Strip query/fragment; path already comes from the request line.
    raw_path = request_path.split("?", 1)[0].split("#", 1)[0]
    path = unquote(raw_path)

    if not path.startswith("/"):
        return None, 403

    # Collapse . and .. segments the way SimpleHTTPRequestHandler does.
    parts = []
    for part in path.split("/"):
        if part in ("", "."):
            continue
        if part == "..":
            if parts:
                parts.pop()
            continue
        parts.append(part)

    # Directory URLs (trailing slash or empty) map to index.html.
    wants_dir = raw_path.endswith("/") or not parts
    if wants_dir:
        candidate = os.path.join(STATIC_ROOT, *parts, "index.html")
    else:
        candidate = os.path.join(STATIC_ROOT, *parts)
        if os.path.isdir(candidate):
            # /foo without slash: only serve if index exists; no redirects.
            candidate = os.path.join(candidate, "index.html")

    try:
        real = os.path.realpath(candidate)
    except OSError:
        return None, 404

    # Ensure the resolved path stays under STATIC_ROOT.
    try:
        common = os.path.commonpath([STATIC_ROOT, real])
    except ValueError:
        return None, 403
    if common != STATIC_ROOT:
        return None, 403

    if not os.path.isfile(real):
        return None, 404

    return real, None


def _send_error(conn, status, method, path):
    body = to_bytes(f"{status} {_STATUS_TEXT.get(status, 'Error')}\n")
    _send_response(
        conn,
        status,
        "text/plain; charset=utf-8",
        body if method != "HEAD" else b"",
        content_length=len(body),
    )
    logger.info(f"{method} {path} -> {status}")
    return status


def _send_response(conn, status, content_type, body, content_length):
    reason = _STATUS_TEXT.get(status, "Error")
    header = (
        f"HTTP/1.1 {status} {reason}\r\n"
        f"Content-Type: {content_type}\r\n"
        f"Content-Length: {content_length}\r\n"
        "Connection: close\r\n"
        "\r\n"
    )
    try:
        conn.sendall(to_bytes(header))
        if body:
            conn.sendall(body)
    except OSError:
        pass
