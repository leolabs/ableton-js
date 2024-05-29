from __future__ import absolute_import
from .version import version
from .Config import DEBUG
from .Logging import logger

from .Interface import Interface
from .Application import Application
from .ApplicationView import ApplicationView
from .Browser import Browser
from .BrowserItem import BrowserItem
from .CuePoint import CuePoint
from .Device import Device
from .DeviceParameter import DeviceParameter
from .MixerDevice import MixerDevice
from .Scene import Scene
from .Song import Song
from .SongView import SongView
from .Track import Track
from .TrackView import TrackView
from .Internal import Internal
from .ClipSlot import ClipSlot
from .Clip import Clip
from .Midi import Midi

from _Framework.ControlSurface import ControlSurface
import Live


class AbletonJSBase(ControlSurface):
    def __init__(self, c_instance):
        super(AbletonJSBase, self).__init__(c_instance)
        logger.info(f"Starting AbletonJS {version}...")
        self._socket = None
        self.tracked_midi = set()
        self.handlers = {
            "application": Application(c_instance, self.socket, self.application()),
            "application-view": ApplicationView(c_instance, self.socket, self.application()),
            "browser": Browser(c_instance, self.socket, self.application()),
            "browser-item": BrowserItem(c_instance, self.socket),
            "cue-point": CuePoint(c_instance, self.socket),
            "device": Device(c_instance, self.socket),
            "device-parameter": DeviceParameter(c_instance, self.socket),
            "internal": Internal(c_instance, self.socket),
            "midi": Midi(c_instance, self.socket, self.tracked_midi, self.request_rebuild_midi_map),
            "mixer-device": MixerDevice(c_instance, self.socket),
            "scene": Scene(c_instance, self.socket),
            "song": Song(c_instance, self.socket),
            "song-view": SongView(c_instance, self.socket),
            "track": Track(c_instance, self.socket),
            "track-view": TrackView(c_instance, self.socket),
            "clip_slot": ClipSlot(c_instance, self.socket),
            "clip": Clip(c_instance, self.socket),
        }
        
    @property
    def socket(self):
        return self._socket

    @socket.setter
    def socket(self, value):
        self._socket = value
        for handler in self.handlers.values():
            handler.socket = value

    def build_midi_map(self, midi_map_handle):
        script_handle = self._c_instance.handle()
        for midi in self.tracked_midi:
            if midi[0] == "cc":
                Live.MidiMap.forward_midi_cc(
                    script_handle, midi_map_handle, midi[1], midi[2])
            elif midi[0] == "note":
                Live.MidiMap.forward_midi_note(
                    script_handle, midi_map_handle, midi[1], midi[2])

    def receive_midi(self, midi_bytes):
        self.handlers["midi"].send_midi(midi_bytes)

   
    def command_handler(self, payload):
        namespace = payload["ns"]

        # Don't clutter the logs
        if not (namespace == "internal" and payload["name"] == "get_prop" and payload["args"]["prop"] == "ping") and DEBUG:
            logger.debug("Received command: " + str(payload))

        if namespace in self.handlers:
            handler = self.handlers[namespace]
            handler.handle(payload)
        else:
            self.socket.send(f"error - No handler for namespace: {namespace}, Payload UUID: {payload['uuid']}")
            
    def disconnect(self):
        logger.info("Disconnecting")
        self.socket.send("disconnect")
        self.socket.shutdown()
        Interface.listeners.clear()
        super(AbletonJSBase, self).disconnect()
        
