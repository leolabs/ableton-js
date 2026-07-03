from __future__ import absolute_import

from .Interface import Interface


class DrumPad(Interface):
    @staticmethod
    def serialize_drum_pad(pad):
        if pad is None:
            return None

        pad_id = Interface.save_obj(pad)

        mute = False
        solo = False
        note = None

        try:
            mute = pad.mute
        except:
            pass

        try:
            solo = pad.solo
        except:
            pass

        try:
            note = pad.note
        except:
            pass

        return {
            "id": pad_id,
            "name": pad.name,
            "note": note,
            "mute": mute,
            "solo": solo,
        }

    def __init__(self, c_instance, socket):
        super(DrumPad, self).__init__(c_instance, socket)

    def get_chains(self, ns):
        from .Chain import Chain
        return map(Chain.serialize_chain, ns.chains)
