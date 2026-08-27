
from .Chain import Chain
from .DrumPad import DrumPad
from .Interface import Interface


class RackDeviceView(Interface):
    def get_ns(self, nsid):
        return Interface.get_obj(nsid).view

    def get_selected_chain(self, ns):
        return Chain.serialize_chain(ns.selected_chain)

    def set_selected_chain(self, ns, value):
        ns.selected_chain = Interface.get_obj(value) if value else None

    def get_selected_drum_pad(self, ns):
        try:
            return DrumPad.serialize_drum_pad(ns.selected_drum_pad)
        except RuntimeError:
            return None

    def set_selected_drum_pad(self, ns, value):
        ns.selected_drum_pad = Interface.get_obj(value)

    def get_drum_pads_scroll_position(self, ns):
        try:
            return ns.drum_pads_scroll_position
        except RuntimeError:
            return None

    def set_drum_pads_scroll_position(self, ns, value):
        ns.drum_pads_scroll_position = int(value)

    def set_is_showing_chain_devices(self, ns, value):
        ns.is_showing_chain_devices = bool(value)
