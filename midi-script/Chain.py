from __future__ import absolute_import

from .Interface import Interface


class Chain(Interface):
    @staticmethod
    def serialize_chain(chain):
        if chain is None:
            return None

        chain_id = Interface.save_obj(chain)

        mute = False
        solo = False
        color = None

        try:
            mute = chain.mute
        except:
            pass

        try:
            solo = chain.solo
        except:
            pass

        try:
            color = chain.color
        except:
            pass

        return {
            "id": chain_id,
            "name": chain.name,
            "color": color,
            "mute": mute,
            "solo": solo,
        }

    def __init__(self, c_instance, socket):
        super(Chain, self).__init__(c_instance, socket)

    def get_devices(self, ns):
        from .Device import Device
        return map(Device.serialize_device, ns.devices)

    def get_mixer_device(self, ns):
        from .MixerDevice import MixerDevice
        return MixerDevice.serialize_mixer_device(ns.mixer_device)
