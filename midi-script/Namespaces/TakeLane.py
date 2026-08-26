from __future__ import absolute_import

from .Clip import Clip
from .Interface import Interface


class TakeLane(Interface):
    @staticmethod
    def serialize_take_lane(lane):
        if lane is None:
            return None

        return {
            "id": Interface.save_obj(lane),
            "name": lane.name,
        }

    def __init__(self, c_instance, socket):
        super(TakeLane, self).__init__(c_instance, socket)

    def get_arrangement_clips(self, ns):
        return [Clip.serialize_clip(clip) for clip in ns.arrangement_clips]

    def create_audio_clip(self, ns, file_path, start_time):
        clip = ns.create_audio_clip(file_path, start_time)
        return Clip.serialize_clip(clip)

    def create_midi_clip(self, ns, start_time, length):
        clip = ns.create_midi_clip(start_time, length)
        return Clip.serialize_clip(clip)
