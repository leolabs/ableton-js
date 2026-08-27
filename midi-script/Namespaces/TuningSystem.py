
import Live

from .Interface import Interface


def serialize_pitch_class_and_octave(value):
    if value is None:
        return None
    return {
        "index_in_octave": int(value.index_in_octave),
        "octave": int(value.octave),
    }


def serialize_reference_pitch(value):
    if value is None:
        return None
    return {
        "index_in_octave": int(value.index_in_octave),
        "octave": int(value.octave),
        "frequency": float(value.frequency),
    }


def parse_pitch_class_and_octave(value):
    return Live.TuningSystem.PitchClassAndOctave(
        int(value["index_in_octave"]),
        int(value["octave"]),
    )


def parse_reference_pitch(value):
    return Live.TuningSystem.ReferencePitch(
        int(value["index_in_octave"]),
        int(value["octave"]),
        float(value["frequency"]),
    )


class TuningSystem(Interface):
    @staticmethod
    def serialize_tuning_system(system):
        if system is None:
            return None

        return {
            "id": Interface.save_obj(system),
            "name": system.name,
        }

    def __init__(self, c_instance, socket):
        super().__init__(c_instance, socket)

    def get_lowest_note(self, ns):
        return serialize_pitch_class_and_octave(ns.lowest_note)

    def set_lowest_note(self, ns, value):
        ns.lowest_note = parse_pitch_class_and_octave(value)

    def get_highest_note(self, ns):
        return serialize_pitch_class_and_octave(ns.highest_note)

    def set_highest_note(self, ns, value):
        ns.highest_note = parse_pitch_class_and_octave(value)

    def get_reference_pitch(self, ns):
        return serialize_reference_pitch(ns.reference_pitch)

    def set_reference_pitch(self, ns, value):
        ns.reference_pitch = parse_reference_pitch(value)

    def get_note_tunings(self, ns):
        return [float(cents) for cents in ns.note_tunings]

    def set_note_tunings(self, ns, value):
        ns.note_tunings = [float(cents) for cents in value]
