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
            "is_audio_clip": clip.is_audio_clip,
            "is_midi_clip": clip.is_midi_clip,
        }

    def __init__(self, c_instance, socket):
        super(Clip, self).__init__(c_instance, socket)

    def get_available_warp_modes(self, ns):
        return list(ns.available_warp_modes)

    def set_notes(self, ns, notes):
        return ns.set_notes(tuple(notes))

    def replace_selected_notes(self, ns, notes):
        return ns.replace_selected_notes(tuple(notes))
