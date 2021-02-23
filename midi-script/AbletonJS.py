import sys

from AbletonJS.Socket import Socket
from AbletonJS.CuePoint import CuePoint
from AbletonJS.Device import Device
from AbletonJS.DeviceParameter import DeviceParameter
from AbletonJS.Scene import Scene
from AbletonJS.Song import Song
from AbletonJS.SongView import SongView
from AbletonJS.Track import Track
from AbletonJS.Internal import Internal
from AbletonJS.ClipSlot import ClipSlot
from AbletonJS.Clip import Clip
from _Framework.ControlSurface import ControlSurface


class AbletonJS(ControlSurface):
    def __init__(self, c_instance):
        super(AbletonJS, self).__init__(c_instance)

        Socket.set_log(self.log_message)
        Socket.set_message(self.show_message)
        self.socket = Socket(self.command_handler)

        self.handlers = {
            "internal": Internal(c_instance, self.socket),
            "cue-point": CuePoint(c_instance, self.socket),
            "device": Device(c_instance, self.socket),
            "device-parameter": DeviceParameter(c_instance, self.socket),
            "scene": Scene(c_instance, self.socket),
            "song": Song(c_instance, self.socket),
            "song-view": SongView(c_instance, self.socket),
            "track": Track(c_instance, self.socket),
            "clip_slot": ClipSlot(c_instance, self.socket),
            "clip": Clip(c_instance, self.socket)
        }

        self.parse()

        self.socket.send("connect")

    def disconnect(self):
        self.log_message("Disconnecting")
        self.socket.send("disconnect")
        self.socket.shutdown()
        super(AbletonJS, self).disconnect()

    def parse(self):
        self.socket.process()
        self.schedule_message(1, self.parse)

    def command_handler(self, payload):
        self.log_message("Received command: " + str(payload))
        namespace = payload["ns"]

        if namespace in self.handlers:
            handler = self.handlers[namespace]
            handler.handle(payload)
        else:
            self.socket.send("error", "No handler for NS " + str(namespace))
