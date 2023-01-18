from __future__ import absolute_import

from .Interface import Interface
from .MixerDevice import MixerDevice
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
        return map(Clip.serialize_clip, ns.arrangement_clips)

    def get_devices(self, ns):
        return map(Device.serialize_device, ns.devices)

    def get_clip_slots(self, ns):
        return map(ClipSlot.serialize_clip_slot, ns.clip_slots)

    def get_group_track(self, ns):
        return Track.serialize_track(ns.group_track)

    def get_mixer_device(self, ns):
        return MixerDevice.serialize_mixer_device(ns.mixer_device)

    def duplicate_clip_to_arrangement(self, ns, clip_id, time):
        return ns.duplicate_clip_to_arrangement(self.get_obj(clip_id), time)
