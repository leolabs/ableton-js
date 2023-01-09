from __future__ import absolute_import
from .Interface import Interface
from .Device import Device
from .Clip import Clip
from .ClipSlot import ClipSlot


class MixerDevice(Interface):
    @staticmethod
    def serialize_mixer_device(mixer_device):
        if mixer_device is None:
            return None

        device_id = Interface.save_obj(mixer_device)
        return {"id": device_id, "volume": mixer_device.volume, "track_activator": mixer_device.track_activator}

    def __init__(self, c_instance, socket):
        super(MixerDevice, self).__init__(c_instance, socket)

    def get_sends(self, ns):
        return list(ns.sends)
