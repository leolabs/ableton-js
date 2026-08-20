from __future__ import absolute_import

from .Interface import Interface
from .Logging import logger


class Midi(Interface):
    def __init__(self, c_instance, socket, tracked_midi, update_midi_callback):
        super(Midi, self).__init__(c_instance, socket)
        self.outputs = set()
        self.tracked_midi = tracked_midi
        self.update_midi = update_midi_callback
        self.subscribers = {}

    def get_ns(self, nsid):
        return self

    def set_midi_outputs(self, ns, outputs):
        self.outputs.clear()
        for output in outputs:
            try:
                midi_type = output.get("type")
                if midi_type != "cc" and midi_type != "note":
                    raise ValueError("invalid midi type " + str(midi_type))
                self.outputs.add((midi_type, output.get(
                    "channel"), output.get("target")))
            except ValueError as e:
                logger.error(e)
            except:
                logger.error("invalid midi output requested: " + str(output))

    def _enable_tracking(self):
        logger.info("Attaching MIDI listener")
        self.tracked_midi.clear()
        self.tracked_midi.update(self.outputs)
        self.update_midi()

    def _disable_tracking(self):
        self.tracked_midi.clear()
        self.update_midi()

    def add_listener(self, ns, prop, eventId, connection, nsid="Default"):
        if prop != "midi":
            raise Exception("Listener " + str(prop) + " does not exist.")

        if connection in self.subscribers:
            return self.subscribers[connection]

        first = not self.subscribers
        self.subscribers[connection] = eventId
        if first:
            self._enable_tracking()

        return eventId

    def remove_listener(self, ns, prop, connection, nsid="Default"):
        if prop != "midi":
            raise Exception("Listener " + str(prop) + " does not exist.")

        if connection not in self.subscribers:
            raise Exception("Listener midi does not exist.")

        self.subscribers.pop(connection, None)
        if not self.subscribers:
            self._disable_tracking()
        return True

    def drop_connection(self, connection):
        if connection not in self.subscribers:
            return
        self.subscribers.pop(connection, None)
        if not self.subscribers:
            try:
                self._disable_tracking()
            except Exception:
                logger.error("Could not disable MIDI tracking after disconnect")

    def send_midi(self, midi_bytes):
        payload = {"bytes": midi_bytes}
        for conn, event_id in list(self.subscribers.items()):
            self.socket.send_to(conn, event_id, payload)
