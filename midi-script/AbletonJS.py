from __future__ import absolute_import
import time

from .version import version
from .Config import DEBUG, FAST_POLLING
from .Logging import logger
from .Socket import Socket
from .Interface import Interface
from .Application import Application
from .Session import Session
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
from _Framework.SessionComponent import SessionComponent
import Live


class AbletonJS(ControlSurface):
    def __init__(self, c_instance):
        super(AbletonJS, self).__init__(c_instance)

        logger.info("Starting AbletonJS " + version + "...")

        self.tracked_midi = set()

        Socket.set_message(self.show_message)
        self.socket = Socket(self.command_handler)

        self.handlers = {
            "application": Application(c_instance, self.socket, self.application()),
            "application-view": ApplicationView(c_instance, self.socket, self.application()),
            # added for red box control
            "session": Session(c_instance, self.socket),
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

        self._last_tick = time.time() * 1000
        self.tick()

        if FAST_POLLING:
            self.recv_loop = Live.Base.Timer(
                callback=self.socket.process, interval=10, repeat=True)

            self.recv_loop.start()

    def setup_session_box(self, num_tracks=2, num_scenes=2):
        logger.info(
            f"Setting up session box with {num_tracks} tracks and {num_scenes} scenes.")
        self.session = SessionComponent(num_tracks, num_scenes)
        self.session.set_offsets(0, 0)
        self.set_highlighting_session_component(self.session)

    def set_session_offset(self, ns, track_offset, scene_offset):
        """
        Sets the offset of the SessionComponent instance.
        """
        logger.info(
            f"Moving session box offset to {track_offset} and {scene_offset}.")
        self.session.set_offsets(track_offset, scene_offset)
        return True

    def tick(self):
        tick_time = time.time() * 1000

        if tick_time - self._last_tick > 200:
            logger.warning("UDP tick is lagging, delta: " +
                           str(round(tick_time - self._last_tick)) + "ms")

        self._last_tick = tick_time
        self.socket.process()

        process_time = time.time() * 1000

        if process_time - tick_time > 100:
            logger.warning("UDP processing is taking long, delta: " +
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
        logger.info("Disconnecting")
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
            logger.debug("Received command: " + str(payload))

        if namespace in self.handlers:
            handler = self.handlers[namespace]
            handler.handle(payload)
        elif payload["name"] == "set_session_box":
            num_tracks = payload["args"].get("num_tracks", 2)
            num_scenes = payload["args"].get("num_scenes", 2)
            # the session box setup must happen out of the main thread
            with self.component_guard():
                result = self.setup_session_box(num_tracks, num_scenes)
                self.socket.send("result", result, payload["uuid"])
        elif payload["name"] == "set_session_offsets":
            track_offset = payload["args"].get("track_offset", 0)
            scene_offset = payload["args"].get("scene_offset", 0)
            result = self.set_session_offset(None, track_offset, scene_offset)
            self.socket.send("result", result, payload["uuid"])
        else:
            self.socket.send("error", "No handler for namespace " +
                             str(namespace), payload["uuid"])
