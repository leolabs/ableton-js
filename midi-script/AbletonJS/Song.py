from Interface import Interface
from CuePoint import CuePoint
from Scene import Scene
from Track import Track


class Song(Interface):
    def __init__(self, c_instance, socket):
        super(Song, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return self.ableton.song()

    def get_cue_points(self, ns):
        return map(CuePoint.serialize_cue_point, ns.cue_points)

    def get_clip_trigger_quantization(self, ns):
        return str(ns.clip_trigger_quantization)

    def get_midi_recording_quantization(self, ns):
        return str(ns.midi_recording_quantization)

    def get_master_track(self, ns):
        return Track.serialize_track(ns.master_track)

    def get_return_tracks(self, ns):
        return map(Track.serialize_track, ns.return_tracks)

    def get_scenes(self, ns):
        return map(Scene.serialize_scene, ns.scenes)

    def get_tracks(self, ns):
        return map(Track.serialize_track, ns.tracks)

    def get_visible_tracks(self, ns):
        return map(Track.serialize_track, ns.visible_tracks)

    def jump_to_cue(self, ns, time):
        for cue in ns.cue_points:
            if cue.time == time:
                cue.jump()
                return True
        return False
