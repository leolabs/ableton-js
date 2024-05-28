from __future__ import absolute_import
import queue
from .version import version
from .Config import DEBUG, FAST_POLLING
from .Logging import logger
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
from .TrackView import TrackView
from .Internal import Internal
from .ClipSlot import ClipSlot
from .Clip import Clip
from .Midi import Midi

from _Framework.ControlSurface import ControlSurface
import Live


class AbletonJS(ControlSurface):
    def __init__(self, c_instance):
        super(AbletonJS, self).__init__(c_instance)
        logger.info("Starting AbletonJS " + version + "...")
        self.tracked_midi = set()
        self.message_queue = queue.Queue()
        self.socket = Socket(c_instance, self.socket_callback)
        self.socket.start()
        self.check_queue = Live.Base.Timer(callback=self.process_queue, interval=20, repeat=True)
        self.check_queue.start()
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

        # self._last_tick = time.time() * 1000
        # self.tick()

       
            
    # I'm not sure what this code is for as I didn't need it when building the socket, but I have commented it out and left it here.
    # def tick(self):
    #     tick_time = time.time() * 1000

    #     if tick_time - self._last_tick > 200:
    #         logger.warning("UDP tick is lagging, delta: " +
    #                        str(round(tick_time - self._last_tick)) + "ms")

    #     self._last_tick = tick_time
    #     self.socket.process()

    #     process_time = time.time() * 1000

    #     if process_time - tick_time > 100:
    #         logger.warning("UDP processing is taking long, delta: " +
    #                        str(round(tick_time - process_time)) + "ms")

    #     self.schedule_message(1, self.tick)

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
        self.check_queue.stop()
        self.socket.send_message("disconnect")
        if self.socket.connection:
            self.socket.connection.close()
        self.socket.socket.close()
        super(AbletonJS, self).disconnect()
        
    def socket_callback(self, payload):
        self.message_queue.put(payload)
        
    def process_queue(self):
        if not self.message_queue.empty():
            try:
                payload = self.message_queue.get()
                logger.debug(f"Payload: {payload}")
                self.command_handler(payload)
            except Exception as e:
                logger.error(f'Error processing queue: {e}')

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
