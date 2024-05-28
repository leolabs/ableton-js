from __future__ import absolute_import
from .Interface import Interface


class Clip(Interface):
    @staticmethod
    def serialize_clip(clip):
        if clip is None:
            return None

        clip_id = Interface.save_obj(clip)
        return {
            "id": clip_id,
            "name": clip.name,
            "color": clip.color,
            "color_index": clip.color_index,
            "is_audio_clip": clip.is_audio_clip,
            "is_midi_clip": clip.is_midi_clip,
            "start_time": clip.start_time,
            "end_time": clip.end_time,
            "muted": clip.muted
        }

    def __init__(self, c_instance, socket):
        super(Clip, self).__init__(c_instance, socket)

    def get_notes(self, ns, from_time=0, from_pitch=0, time_span=99999999999999, pitch_span=128):
        return ns.get_notes(from_time, from_pitch, time_span, pitch_span)

    def get_warp_markers(self, ns):
        dict_markers = []
        for warp_marker in ns.warp_markers:
            dict_markers.append({
                "beat_time": warp_marker.beat_time,
                "sample_time": warp_marker.sample_time,
            })
        return dict_markers

    def set_notes(self, ns, notes):
        return ns.set_notes(tuple(notes))

    def replace_selected_notes(self, ns, notes):
        return ns.replace_selected_notes(tuple(notes))
