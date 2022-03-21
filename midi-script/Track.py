from __future__ import absolute_import
from .Interface import Interface
from .Device import Device
from .Clip import Clip
from .ClipSlot import ClipSlot


class Track(Interface):
    @staticmethod
    def serialize_track(track):
        if track is None:
            return None

        track_id = Interface.save_obj(track)
        return {"id": track_id, "name": track.name, "color": track.color, "is_foldable": track.is_foldable, "is_grouped": track.is_grouped}

    def __init__(self, c_instance, socket):
        super(Track, self).__init__(c_instance, socket)

    def get_arrangement_clips(self, ns):
        return list(map(Clip.serialize_clip, ns.arrangement_clips))

    def get_devices(self, ns):
        return list(map(Device.serialize_device, ns.devices))

    def get_clip_slots(self, ns):
        return list(map(ClipSlot.serialize_clip_slot, ns.clip_slots))
