from __future__ import absolute_import

from .Interface import Interface
from .Logging import logger


class Midi(Interface):
    event_id = None

    def __init__(self, c_instance, socket, tracked_midi, update_midi_callback):
        super(Midi, self).__init__(c_instance, socket)
        self.outputs = set()
        self.tracked_midi = tracked_midi
        self.update_midi = update_midi_callback

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

    def remove_midi_listener(self, fn):
        self.event_id = None
        self.tracked_midi.clear()
        self.update_midi()

    def add_listener(self, ns, prop, eventId, nsid="Default"):
        if prop != "midi":
            raise Exception("Listener " + str(prop) + " does not exist.")

        if self.event_id is not None:
            logger.warn("midi listener already exists")
            return self.event_id

        logger.info("Attaching midi listener")

        self.tracked_midi.clear()
        self.tracked_midi.update(self.outputs)
        self.update_midi()
        self.event_id = eventId

        return eventId

    def send_midi(self, midi_bytes):
        if self.event_id is not None:
            self.socket.send(self.event_id, {"bytes": midi_bytes})
