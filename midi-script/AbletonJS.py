import sys

from Socket import Socket
from CuePoint import CuePoint
from Device import Device
from DeviceParameter import DeviceParameter
from Scene import Scene
from Song import Song
from SongView import SongView
from Track import Track
from _Framework.ControlSurface import ControlSurface


class AbletonJS(ControlSurface):
    def __init__(self, c_instance):
        super(AbletonJS, self).__init__(c_instance)

        Socket.log_message = self.log_message
        Socket.show_message = self.show_message
        self.socket = Socket(self.command_handler)

        self.handlers = {
            "cue-point": CuePoint(c_instance, self.socket),
            "device": Device(c_instance, self.socket),
            "device-parameter": DeviceParameter(c_instance, self.socket),
            "scene": Scene(c_instance, self.socket),
            "song": Song(c_instance, self.socket),
            "song-view": SongView(c_instance, self.socket),
            "track": Track(c_instance, self.socket),
        }

    def disconnect(self):
        self.log_message("Disconnecting")
        self.socket.send("disconnect")
        self.socket.shutdown()
        super(AbletonJS, self).disconnect()

    def command_handler(self, payload, send):
        self.log_message("Received command: " + str(payload))
        namespace = payload["ns"]

        if self.handlers.has_key(namespace):
            handler = self.handlers[namespace]
            handler.handle(payload, send)
        else:
            send("error", "No handler for NS " + str(namespace))
