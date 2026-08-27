from __future__ import absolute_import

import time

import Live
from _Framework.ControlSurface import ControlSurface

from .Config import DEBUG, PLUGIN_NAME
from .Logging import logger
from .Namespaces.Application import Application
from .Namespaces.ApplicationView import ApplicationView
from .Namespaces.Browser import Browser
from .Namespaces.BrowserItem import BrowserItem
from .Namespaces.Chain import Chain
from .Namespaces.Clip import Clip
from .Namespaces.ClipSlot import ClipSlot
from .Namespaces.CuePoint import CuePoint
from .Namespaces.Device import Device
from .Namespaces.DeviceParameter import DeviceParameter
from .Namespaces.DeviceView import DeviceView
from .Namespaces.DrumPad import DrumPad
from .Namespaces.Envelope import Envelope
from .Namespaces.Groove import Groove
from .Namespaces.GroovePool import GroovePool
from .Namespaces.Interface import Interface
from .Namespaces.Internal import Internal
from .Namespaces.LooperDevice import LooperDevice
from .Namespaces.Midi import Midi
from .Namespaces.MixerDevice import MixerDevice
from .Namespaces.PluginDevice import PluginDevice
from .Namespaces.Scene import Scene
from .Namespaces.Session import Session
from .Namespaces.Song import Song
from .Namespaces.SongView import SongView
from .Namespaces.TakeLane import TakeLane
from .Namespaces.Track import Track
from .Namespaces.TrackView import TrackView
from .Namespaces.TuningSystem import TuningSystem
from .Socket import Socket
from .version import version


class AbletonJS(ControlSurface):
    def __init__(self, c_instance):
        super().__init__(c_instance)

        logger.info(f"Starting {PLUGIN_NAME} {version}...")

        self.tracked_midi = set()

        Socket.set_message(self.show_message)
        self.socket = Socket(self.command_handler, self.client_disconnected)

        self.handlers = {
            "application": Application(c_instance, self.socket, self.application()),
            "application-view": ApplicationView(
                c_instance, self.socket, self.application()
            ),
            # added for red box control
            "session": Session(c_instance, self.socket, self),
            "browser": Browser(c_instance, self.socket, self.application()),
            "browser-item": BrowserItem(c_instance, self.socket),
            "chain": Chain(c_instance, self.socket),
            "cue-point": CuePoint(c_instance, self.socket),
            "device": Device(c_instance, self.socket),
            "device-parameter": DeviceParameter(c_instance, self.socket),
            "device-view": DeviceView(c_instance, self.socket),
            "drum-pad": DrumPad(c_instance, self.socket),
            "envelope": Envelope(c_instance, self.socket),
            "groove": Groove(c_instance, self.socket),
            "groove-pool": GroovePool(c_instance, self.socket),
            "internal": Internal(c_instance, self.socket),
            "looper-device": LooperDevice(c_instance, self.socket),
            "midi": Midi(
                c_instance,
                self.socket,
                self.tracked_midi,
                self.request_rebuild_midi_map,
            ),
            "mixer-device": MixerDevice(c_instance, self.socket),
            "plugin-device": PluginDevice(c_instance, self.socket),
            "scene": Scene(c_instance, self.socket),
            "song": Song(c_instance, self.socket),
            "song-view": SongView(c_instance, self.socket),
            "take-lane": TakeLane(c_instance, self.socket),
            "track": Track(c_instance, self.socket),
            "track-view": TrackView(c_instance, self.socket),
            "tuning-system": TuningSystem(c_instance, self.socket),
            "clip_slot": ClipSlot(c_instance, self.socket),
            "clip": Clip(c_instance, self.socket),
        }

        self._last_tick = time.time() * 1000
        self.tick()

        self.recv_loop = Live.Base.Timer(
            callback=self.socket.process, interval=1, repeat=True
        )
        self.recv_loop.start()

    def tick(self):
        tick_time = time.time() * 1000

        if tick_time - self._last_tick > 200:
            logger.warning(
                f"Ableton Live's main thread is lagging, delta: {round(tick_time - self._last_tick)}ms"
            )

        self._last_tick = tick_time
        self.socket.process()

        process_time = time.time() * 1000

        if process_time - tick_time > 100:
            logger.warning(
                f"WebSocket processing is taking long, delta: {round(tick_time - process_time)}ms"
            )

        self.schedule_message(1, self.tick)

    def build_midi_map(self, midi_map_handle):
        script_handle = self._c_instance.handle()
        for midi in self.tracked_midi:
            if midi[0] == "cc":
                Live.MidiMap.forward_midi_cc(
                    script_handle, midi_map_handle, midi[1], midi[2]
                )
            elif midi[0] == "note":
                Live.MidiMap.forward_midi_note(
                    script_handle, midi_map_handle, midi[1], midi[2]
                )

    def receive_midi(self, midi_bytes):
        self.handlers["midi"].send_midi(midi_bytes)

    def disconnect(self):
        logger.info("Disconnecting")
        self.recv_loop.stop()
        self.socket.broadcast("disconnect")
        self.socket.shutdown()
        Interface.listeners.clear()
        Interface.obj_ids.clear()
        super().disconnect()

    def command_handler(self, payload, connection):
        uuid = payload.get("uuid")
        commands = payload.get("commands")

        if not isinstance(commands, list):
            self.socket.send_to(
                connection, "error", "Missing or invalid commands array", uuid
            )
            return

        if DEBUG:
            should_log = True
            if len(commands) == 1:
                cmd = commands[0] or {}
                if (
                    cmd.get("ns") == "internal"
                    and cmd.get("name") == "get_prop"
                    and (cmd.get("args") or {}).get("prop") == "ping"
                ):
                    should_log = False
            if should_log:
                logger.debug(f"Received command: {payload}")

        results = []
        for command in commands:
            try:
                namespace = command.get("ns")
                if namespace not in self.handlers:
                    raise Exception(f"No handler for namespace {namespace}")
                data = self.handlers[namespace].dispatch(command, connection)
                results.append({"ok": True, "data": data})
            except Exception as e:
                logger.error("Handler Error:")
                logger.exception(e)
                message = str(e.args[0]) if e.args else str(e)
                results.append({"ok": False, "error": message})

        self.socket.send_to(connection, "result", results, uuid)

    def client_disconnected(self, connection):
        Interface.drop_connection(connection)
        self.handlers["midi"].drop_connection(connection)
