import sys

from Socket import Socket
from CuePoint import CuePoint
from Song import Song
from Track import Track
from _Framework.ControlSurface import ControlSurface


class AbletonJS(ControlSurface):
    def __init__(self, c_instance):
        super(AbletonJS, self).__init__(c_instance)

        Socket.set_log(self.log_message)
        Socket.set_message(self.show_message)
        self.socket = Socket()

        self.handlers = {
            "cue-point": CuePoint(c_instance, self.socket),
            "song": Song(c_instance, self.socket),
            "track": Track(c_instance, self.socket),
        }

        self.socket.set_handler(self.command_handler)
        self.parse()

    def disconnect(self):
        self.log_message("Disconnecting")
        self.socket.shutdown()
        super(AbletonJS, self).disconnect()

    def parse(self):
        self.socket.process()
        self.schedule_message(1, self.parse)

    def command_handler(self, payload):
        self.log_message("Received command: " + str(payload))
        namespace = payload["ns"]

        if self.handlers.has_key(namespace):
            handler = self.handlers[namespace]
            handler.handle(payload)
        else:
            self.socket.send("error", "No handler for NS " + str(namespace))
