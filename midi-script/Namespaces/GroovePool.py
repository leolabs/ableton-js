from __future__ import absolute_import

from .Groove import Groove
from .Interface import Interface


class GroovePool(Interface):
    def __init__(self, c_instance, socket):
        super().__init__(c_instance, socket)

    def get_ns(self, nsid):
        return self.ableton.song().groove_pool

    def get_grooves(self, ns):
        return [Groove.serialize_groove(groove) for groove in ns.grooves]
