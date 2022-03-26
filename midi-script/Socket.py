import socket
import json
import struct
import zlib
from threading import Timer, Thread
from timeit import default_timer as timer


def split_by_n(seq, n):
    '''A generator to divide a sequence into chunks of n units.'''
    while seq:
        yield seq[:n]
        seq = seq[n:]


class ThreadSocket(Thread):
    def __init__(self, host, port, handler, log_message, show_message):
        super(ThreadSocket, self).__init__()
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.log_message = log_message
        self.show_message = show_message
        self.host = host
        self.port = port
        self.input_handler = handler

    def bind(self):
        debug_addr = str(self.host) + ":" + str(self.port)

        try:
            self.log_message("Starting socket on " + debug_addr)
            self._socket.bind((self.host, self.port))
        except:
            msg = 'ERROR: Cannot bind to ' + debug_addr + ', port in use. Trying again...'
            self.show_message(msg)
            self.log_message(msg)
            t = Timer(5, self.bind)
            t.start()

    def run(self):
        self.bind()
        buffer = bytes()

        while 1:
            try:
                data = self._socket.recv(65536)
                if len(data) and self.input_handler:
                    buffer += data[1:]

                    # \xFF for Live 10 (Python2) and 255 for Live 11 (Python3)
                    if(data[0] == b'\xFF' or data[0] == 255):
                        start = timer()
                        unzipped = zlib.decompress(buffer)
                        payload = json.loads(unzipped)

                        self.log_message("Receiving: " + str(payload))
                        self.input_handler(payload)
                        end = timer()
                        self.log_message("Received in " +
                                         str(end - start) + "ms")
                        buffer = bytes()
            except socket.error as e:
                if e.errno == 35:
                    continue
                else:
                    raise e
            except Exception as e:
                self.log_message("Error while processing: " + str(e.args))


class Socket(object):

    @staticmethod
    def set_log(func):
        Socket.log_message = func

    @staticmethod
    def set_message(func):
        Socket.show_message = func

    def __init__(self, handler, remotehost='127.0.0.1', remoteport=9031, localhost='127.0.0.1', localport=9041):
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self._remote_addr = (remotehost, remoteport)
        self.socket_thread = ThreadSocket(
            localhost, localport, handler, self.log_message, self.show_message)

    def _sendto(self, msg):
        '''Send a raw message to the client, compressed and chunked, if necessary'''
        compressed = zlib.compress(msg.encode("utf8")) + b'\n'
        # Based on this thread, 7500 bytes seems like a safe value
        # https://stackoverflow.com/questions/22819214/udp-message-too-long
        limit = 7500

        if len(compressed) < limit:
            self._socket.sendto(b'\xFF' + compressed, self._remote_addr)
        else:
            chunks = list(split_by_n(compressed, limit))
            count = len(chunks)
            for i, chunk in enumerate(chunks):
                count_byte = struct.pack("B", i if i + 1 < count else 255)
                self._socket.sendto(count_byte + chunk, self._remote_addr)

    def send(self, name, obj=None, uuid=None):
        def jsonReplace(o):
            return str(o)

        try:
            self._sendto(json.dumps(
                {"event": name, "data": obj, "uuid": uuid}, default=jsonReplace, ensure_ascii=False))
        except Exception as e:
            error = str(type(e).__name__) + ': ' + str(e.args)
            self._sendto(json.dumps(
                {"event": "error", "data": error, "uuid": uuid}, default=jsonReplace, ensure_ascii=False))
            self.log_message("Socket Error " + name +
                             "(" + str(uuid) + "): " + str(e))

    def shutdown(self):
        self._socket.close()

    def start_thread(self):
        self.socket_thread.start()
