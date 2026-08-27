
import Live

from .DeviceParameter import DeviceParameter
from .Interface import Interface


class Envelope(Interface):
    @staticmethod
    def serialize_envelope(envelope):
        if envelope is None:
            return None

        envelope_id = Interface.save_obj(envelope)
        return {"id": envelope_id}

    @staticmethod
    def serialize_event(event):
        if event is None:
            return None

        coefficients = event.control_coefficients
        return {
            "time": event.time,
            "value": event.value,
            "control_coefficients": {
                "x1": coefficients.x1,
                "y1": coefficients.y1,
                "x2": coefficients.x2,
                "y2": coefficients.y2,
            },
        }

    def __init__(self, c_instance, socket):
        super().__init__(c_instance, socket)

    def get_parameter(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.parameter)

    def create_event(self, ns, time, value, control_coefficients=None):
        event_time = float(time)
        event_value = float(value)
        if control_coefficients is None:
            event = Live.Envelope.EnvelopeEvent(event_time, event_value)
        else:
            coefficients = Live.Envelope.EnvelopeEventControlCoefficients(
                float(control_coefficients.get("x1", 0.5)),
                float(control_coefficients.get("y1", 0.5)),
                float(control_coefficients.get("x2", 0.5)),
                float(control_coefficients.get("y2", 0.5)),
            )
            event = Live.Envelope.EnvelopeEvent(event_time, event_value, coefficients)
        ns.create_event(event)

    def delete_events_in_range(self, ns, from_time, to_time):
        ns.delete_events_in_range(float(from_time), float(to_time))

    def events_in_range(self, ns, from_time, to_time):
        events = ns.events_in_range(float(from_time), float(to_time))
        return [Envelope.serialize_event(event) for event in events]

    def insert_step(self, ns, start_time, length, value):
        ns.insert_step(float(start_time), float(length), float(value))

    def value_at_time(self, ns, time):
        return ns.value_at_time(float(time))
