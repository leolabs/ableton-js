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
        sorted_points = sorted(ns.cue_points, key=lambda cue: cue.time)
        return map(CuePoint.serialize_cue_point, sorted_points)

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

    def begin_undo_step(self, ns):
        return ns.begin_undo_step()

    def continue_playing(self, ns):
        return ns.continue_playing()

    def create_audio_track(self, ns, index=-1):
        return ns.create_audio_track(index)

    def create_midi_track(self, ns, index=-1):
        return ns.create_midi_track(index)

    def create_return_track(self, ns, index=-1):
        return ns.create_return_track(index)

    def create_scene(self, ns, index=-1):
        return ns.create_scene(index)

    def delete_return_track(self, ns, index):
        return ns.delete_return_track(index)

    def delete_scene(self, ns, index):
        return ns.delete_scene(index)

    def delete_track(self, ns, index):
        return ns.delete_track(index)

    def duplicate_scene(self, ns, index):
        return ns.duplicate_scene(index)

    def duplicate_track(self, ns, index):
        return ns.duplicate_track(index)

    def end_undo_step(self, ns):
        return ns.end_undo_step()

    def get_data(self, ns, key):
        return ns.get_data(key, None)

    def get_current_smpte_song_time(self, ns, timeFormat):
        time = ns.get_current_smpte_song_time(timeFormat)
        return {'hours': time.hours, 'minutes': time.minutes, 'seconds': time.seconds, 'frames': time.frames}

    def is_cue_point_selected(self, ns):
        return ns.is_cue_point_selected()

    def jump_by(self, ns, amount):
        return ns.jump_by(amount)

    def jump_to_next_cue(self, ns):
        return ns.jump_to_next_cue()

    def jump_to_prev_cue(self, ns):
        return ns.jump_to_prev_cue()

    def play_selection(self, ns):
        return ns.play_selection()

    def scrub_by(self, ns, amount):
        return ns.scrub_by(amount)

    def set_data(self, ns, key, value):
        return ns.set_data(key, value)

    def start_playing(self, ns):
        return ns.start_playing()

    def stop_all_clips(self, ns):
        return ns.stop_all_clips()

    def stop_playing(self, ns):
        return ns.stop_playing()

    def tap_tempo(self, ns):
        return ns.tap_tempo()
