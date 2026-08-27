
from .DeviceParameter import DeviceParameter
from .Interface import Interface


class ChainMixerDevice(Interface):
    @staticmethod
    def serialize_chain_mixer_device(mixer_device):
        if mixer_device is None:
            return None

        device_id = Interface.save_obj(mixer_device)

        try:
            volume = mixer_device.volume
        except RuntimeError:
            # MIDI Effect Rack chains have no volume parameter.
            volume = None

        return {"id": device_id, "volume": volume}

    def __init__(self, c_instance, socket):
        super().__init__(c_instance, socket)

    def get_chain_activator(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.chain_activator)

    def get_panning(self, ns):
        try:
            return DeviceParameter.serialize_device_parameter(ns.panning)
        except RuntimeError:
            return None

    def get_sends(self, ns):
        try:
            return list(map(DeviceParameter.serialize_device_parameter, ns.sends))
        except RuntimeError:
            return []

    def get_volume(self, ns):
        try:
            return DeviceParameter.serialize_device_parameter(ns.volume)
        except RuntimeError:
            return None
