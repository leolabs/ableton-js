
from .Chain import Chain
from .Device import Device
from .DeviceParameter import DeviceParameter
from .DrumPad import DrumPad


class RackDevice(Device):
    def get_chain_selector(self, ns):
        try:
            return DeviceParameter.serialize_device_parameter(ns.chain_selector)
        except RuntimeError:
            # Drum racks have no chain selector.
            return None

    def get_has_drum_pads(self, ns):
        try:
            return ns.has_drum_pads
        except RuntimeError:
            return False

    def get_macros_mapped(self, ns):
        return list(ns.macros_mapped)

    def get_visible_drum_pads(self, ns):
        try:
            return [DrumPad.serialize_drum_pad(p) for p in ns.visible_drum_pads]
        except (AttributeError, RuntimeError):
            return []

    def set_is_showing_chains(self, ns, value):
        ns.is_showing_chains = bool(value)

    def set_selected_variation_index(self, ns, value):
        ns.selected_variation_index = int(value)

    def copy_pad(self, ns, source_index, destination_index):
        ns.copy_pad(int(source_index), int(destination_index))

    def insert_chain(self, ns, index=-1):
        return Chain.serialize_chain(ns.insert_chain(int(index)))
