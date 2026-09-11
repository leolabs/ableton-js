
from .Chain import Chain


class DrumChain(Chain):
    def set_choke_group(self, ns, value):
        ns.choke_group = int(value)

    def set_in_note(self, ns, value):
        ns.in_note = int(value)

    def set_out_note(self, ns, value):
        ns.out_note = int(value)
