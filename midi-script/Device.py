from __future__ import absolute_import

from .DeviceParameter import DeviceParameter
from .Interface import Interface


class Device(Interface):
    @staticmethod
    def serialize_device(device):
        if device is None:
            return None

        device_id = Interface.save_obj(device)
        return {
            "id": device_id,
            "name": device.name,
            "type": str(device.type),
            "class_name": device.class_name,
        }

    def __init__(self, c_instance, socket):
        super(Device, self).__init__(c_instance, socket)

    def get_parameters(self, ns):
        return map(DeviceParameter.serialize_device_parameter, ns.parameters)

    def get_type(self, ns):
        return str(ns.type)

    def get_chains(self, ns):
        from .Chain import Chain

        try:
            return [Chain.serialize_chain(c) for c in ns.chains]
        except AttributeError:
            return []

    def get_return_chains(self, ns):
        from .Chain import Chain

        try:
            return [Chain.serialize_chain(c) for c in ns.return_chains]
        except AttributeError:
            return []

    def get_drum_pads(self, ns):
        from .DrumPad import DrumPad

        try:
            return [DrumPad.serialize_drum_pad(p) for p in ns.drum_pads]
        except AttributeError:
            return []
