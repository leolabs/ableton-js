from __future__ import absolute_import

import time

import Live
from _Framework.ControlSurface import ControlSurface

from .Application import Application
from .ApplicationView import ApplicationView
from .Browser import Browser
from .BrowserItem import BrowserItem
from .Chain import Chain
from .Clip import Clip
from .ClipSlot import ClipSlot
from .Config import DEBUG
from .CuePoint import CuePoint
from .Device import Device
from .DeviceParameter import DeviceParameter
from .DeviceView import DeviceView
from .DrumPad import DrumPad
from .Envelope import Envelope
from .Interface import Interface
from .Internal import Internal
from .Logging import logger
from .LooperDevice import LooperDevice
from .Midi import Midi
from .MixerDevice import MixerDevice
from .PluginDevice import PluginDevice
from .Scene import Scene
from .Session import Session
from .Socket import Socket
from .Song import Song
from .SongView import SongView
from .Track import Track
from .TrackView import TrackView
from .version import version


class AbletonJS(ControlSurface):
    def __init__(self, c_instance):
        super(AbletonJS, self).__init__(c_instance)

        logger.info("Starting AbletonJS " + version + "...")

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
            "track": Track(c_instance, self.socket),
            "track-view": TrackView(c_instance, self.socket),
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
                "Ableton Live's main thread is lagging, delta: "
                + str(round(tick_time - self._last_tick))
                + "ms"
            )

        self._last_tick = tick_time
        self.socket.process()

        process_time = time.time() * 1000

        if process_time - tick_time > 100:
            logger.warning(
                "WebSocket processing is taking long, delta: "
                + str(round(tick_time - process_time))
                + "ms"
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
        super(AbletonJS, self).disconnect()

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
                logger.debug("Received command: " + str(payload))

        results = []
        for command in commands:
            try:
                namespace = command.get("ns")
                if namespace not in self.handlers:
                    raise Exception("No handler for namespace " + str(namespace))
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
