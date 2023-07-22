from __future__ import absolute_import
import time

from .version import version
from .Config import DEBUG, FAST_POLLING
from .Socket import Socket
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
from .Internal import Internal
from .ClipSlot import ClipSlot
from .Clip import Clip
from .Midi import Midi

from _Framework.ControlSurface import ControlSurface
import Live


class AbletonJS(ControlSurface):
    def __init__(self, c_instance):
        super(AbletonJS, self).__init__(c_instance)
        self.log_message("Starting AbletonJS " + version + "...")

        self.tracked_midi = set()

        Socket.set_log(self.log_message)
        Socket.set_message(self.show_message)
        self.socket = Socket(self.command_handler)

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
            "clip_slot": ClipSlot(c_instance, self.socket),
            "clip": Clip(c_instance, self.socket),
        }

        self._last_tick = time.time() * 1000
        self.tick()

        if FAST_POLLING:
            self.recv_loop = Live.Base.Timer(
                callback=self.socket.process, interval=10, repeat=True)

            self.recv_loop.start()

    def tick(self):
        tick_time = time.time() * 1000

        if tick_time - self._last_tick > 200:
            self.log_message("UDP tick is lagging, delta: " +
                             str(round(tick_time - self._last_tick)) + "ms")

        self._last_tick = tick_time
        self.socket.process()

        process_time = time.time() * 1000

        if process_time - tick_time > 100:
            self.log_message("UDP processing is taking long, delta: " +
                             str(round(tick_time - process_time)) + "ms")

        self.schedule_message(1, self.tick)

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

    def disconnect(self):
        self.log_message("Disconnecting")
        if FAST_POLLING:
            self.recv_loop.stop()
        self.socket.send("disconnect")
        self.socket.shutdown()
        Interface.listeners.clear()
        super(AbletonJS, self).disconnect()

    def command_handler(self, payload):
        namespace = payload["ns"]

        # Don't clutter the logs
        if not (namespace == "internal" and payload["name"] == "get_prop" and payload["args"]["prop"] == "ping") and DEBUG:
            self.log_message("Received command: " + str(payload))

        if namespace in self.handlers:
            handler = self.handlers[namespace]
            handler.handle(payload)
        else:
            self.socket.send("error", "No handler for namespace " +
                             str(namespace), payload["uuid"])
