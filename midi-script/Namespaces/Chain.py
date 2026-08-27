
from .Device import Device
from .Interface import Interface


class Chain(Interface):
    @staticmethod
    def serialize_chain(chain):
        if chain is None:
            return None

        chain_id = Interface.save_obj(chain)

        try:
            mute = chain.mute
        except:
            mute = False

        try:
            solo = chain.solo
        except:
            solo = False

        try:
            color = chain.color
        except:
            color = None

        data = {
            "id": chain_id,
            "name": chain.name,
            "color": color,
            "mute": mute,
            "solo": solo,
        }

        # DrumChain exposes these; regular Chain does not.
        try:
            data["choke_group"] = int(chain.choke_group)
            data["in_note"] = int(chain.in_note)
            data["out_note"] = int(chain.out_note)
            data["is_drum_chain"] = True
        except Exception:
            data["is_drum_chain"] = False

        return data

    def __init__(self, c_instance, socket):
        super().__init__(c_instance, socket)

    def get_devices(self, ns):
        return map(Device.serialize_device, ns.devices)

    def get_mixer_device(self, ns):
        from .ChainMixerDevice import ChainMixerDevice

        return ChainMixerDevice.serialize_chain_mixer_device(ns.mixer_device)

    def set_color(self, ns, value):
        ns.color = int(value)

    def set_color_index(self, ns, value):
        ns.color_index = int(value)

    def set_is_auto_colored(self, ns, value):
        ns.is_auto_colored = bool(value)

    def delete_device(self, ns, index):
        ns.delete_device(int(index))

    def duplicate_device(self, ns, index):
        ns.duplicate_device(int(index))

    def insert_device(self, ns, device_name, device_index=-1):
        device = ns.insert_device(device_name, int(device_index))
        return Device.serialize_device(device)
