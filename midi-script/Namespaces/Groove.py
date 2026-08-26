from __future__ import absolute_import

import Live

from .Interface import Interface

GROOVE_BASES = {
    "gb_four": Live.Groove.Base.gb_four,
    "gb_eight": Live.Groove.Base.gb_eight,
    "gb_eight_triplet": Live.Groove.Base.gb_eight_triplet,
    "gb_sixteen": Live.Groove.Base.gb_sixteen,
    "gb_sixteen_triplet": Live.Groove.Base.gb_sixteen_triplet,
    "gb_thirtytwo": Live.Groove.Base.gb_thirtytwo,
}


class Groove(Interface):
    @staticmethod
    def serialize_groove(groove):
        if groove is None:
            return None

        return {
            "id": Interface.save_obj(groove),
            "name": groove.name,
        }

    def __init__(self, c_instance, socket):
        super(Groove, self).__init__(c_instance, socket)

    def get_base(self, ns):
        return str(ns.base)

    def set_base(self, ns, value):
        if isinstance(value, (int, float)):
            ns.base = Live.Groove.Base(int(value))
            return
        ns.base = GROOVE_BASES.get(str(value), Live.Groove.Base.gb_sixteen)
