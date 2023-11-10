from __future__ import absolute_import
from .Interface import Interface
from .CuePoint import CuePoint
from .Device import Device
from .Scene import Scene
from .Track import Track

import Live

PLAY_QUANTIZATIONS = {
    'q_8_bars': Live.Song.Quantization.q_8_bars,
    'q_4_bars': Live.Song.Quantization.q_4_bars,
    'q_2_bars': Live.Song.Quantization.q_2_bars,
    'q_bar': Live.Song.Quantization.q_bar,
    'q_half': Live.Song.Quantization.q_half,
    'q_half_triplet': Live.Song.Quantization.q_half_triplet,
    'q_quarter': Live.Song.Quantization.q_quarter,
    'q_quarter_triplet': Live.Song.Quantization.q_quarter_triplet,
    'q_eight': Live.Song.Quantization.q_eight,
    'q_eight_triplet': Live.Song.Quantization.q_eight_triplet,
    'q_sixtenth': Live.Song.Quantization.q_sixtenth,
    'q_sixtenth_triplet': Live.Song.Quantization.q_sixtenth_triplet,
    'q_thirtytwoth': Live.Song.Quantization.q_thirtytwoth,
    'q_no_q': Live.Song.Quantization.q_no_q
}

REC_QUANTIZATIONS = {
    'rec_q_eight': Live.Song.RecordingQuantization.rec_q_eight,
    'rec_q_eight_eight_triplet': Live.Song.RecordingQuantization.rec_q_eight_eight_triplet,
    'rec_q_eight_triplet': Live.Song.RecordingQuantization.rec_q_eight_triplet,
    'rec_q_no_q': Live.Song.RecordingQuantization.rec_q_no_q,
    'rec_q_quarter': Live.Song.RecordingQuantization.rec_q_quarter,
    'rec_q_sixtenth': Live.Song.RecordingQuantization.rec_q_sixtenth,
    'rec_q_sixtenth_sixtenth_triplet': Live.Song.RecordingQuantization.rec_q_sixtenth_sixtenth_triplet,
    'rec_q_sixtenth_triplet': Live.Song.RecordingQuantization.rec_q_sixtenth_triplet,
    'rec_q_thirtysecond': Live.Song.RecordingQuantization.rec_q_thirtysecond,
}


class Song(Interface):
    def __init__(self, c_instance, socket):
        super(Song, self).__init__(c_instance, socket)
        self.song = self.ableton.song()

    def get_ns(self, nsid):
        return self.song

    def create_audio_track(self, ns, index):
        return Track.serialize_track(ns.create_audio_track(index))

    def create_midi_track(self, ns, index):
        return Track.serialize_track(ns.create_midi_track(index))

    def create_return_track(self, ns):
        return Track.serialize_track(ns.create_return_track())

    def create_scene(self, ns, index):
        return Scene.serialize_scene(ns.create_scene(index))

    def get_clip_trigger_quantization(self, ns):
        return str(ns.clip_trigger_quantization)

    def get_cue_points(self, ns):
        sorted_points = sorted(ns.cue_points, key=lambda cue: cue.time)
        return map(CuePoint.serialize_cue_point, sorted_points)

    def get_appointed_device(self, ns):
        return Device.serialize_device(ns.appointed_device)

    def get_master_track(self, ns):
        return Track.serialize_track(ns.master_track)

    def get_midi_recording_quantization(self, ns):
        return str(ns.midi_recording_quantization)

    def get_return_tracks(self, ns):
        return map(Track.serialize_track, ns.return_tracks)

    def get_scenes(self, ns):
        return map(Scene.serialize_scene, ns.scenes)

    def get_tracks(self, ns):
        return map(Track.serialize_track, ns.tracks)

    def get_visible_tracks(self, ns):
        return map(Track.serialize_track, ns.visible_tracks)

    def get_data(self, ns, key):
        return ns.get_data(key, None)

    def get_current_smpte_song_time(self, ns, timeFormat):
        time = ns.get_current_smpte_song_time(timeFormat)
        return {'hours': time.hours, 'minutes': time.minutes, 'seconds': time.seconds, 'frames': time.frames}

    def set_appointed_device(self, ns, device_id):
        ns.appointed_device = Interface.get_obj(device_id)

    def set_clip_trigger_quantization(self, ns, name):
        quantization = PLAY_QUANTIZATIONS.get(str(name), PLAY_QUANTIZATIONS['q_bar'])
        ns.clip_trigger_quantization = quantization

    def set_midi_recording_quantization(self, ns, name):
        quantization = REC_QUANTIZATIONS.get(str(name), REC_QUANTIZATIONS['rec_q_no_q'])
        ns.midi_recording_quantization = quantization

    def safe_stop_playing(self, ns):
        if self.song.is_playing:
            self.song.stop_playing()
            return True

        return False
