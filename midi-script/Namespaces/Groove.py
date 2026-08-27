
import Live

from .Interface import Interface


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
        super().__init__(c_instance, socket)

    def get_base(self, ns):
        return str(ns.base)

    def set_base(self, ns, value):
        ns.base = getattr(Live.Groove.Base, str(value))
