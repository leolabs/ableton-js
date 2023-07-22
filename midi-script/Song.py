from __future__ import absolute_import
from .Interface import Interface
from .CuePoint import CuePoint
from .Device import Device
from .Scene import Scene
from .Track import Track
import Live

INSERT_MODES = {'default':Live.Track.DeviceInsertMode.default, 
 'left':Live.Track.DeviceInsertMode.selected_left, 
 'right':Live.Track.DeviceInsertMode.selected_right}

class Song(Interface):
    def __init__(self, c_instance, socket):
        super(Song, self).__init__(c_instance, socket)
        self.song = self.ableton.song()
        self._insert_mode = INSERT_MODES['default']

    def get_ns(self, nsid):
        return self.song

    def create_audio_track(self, ns, index):
        return Track.serialize_track(ns.create_audio_track(index))

    def create_midi_track(self, ns, index):
        return Track.serialize_track(ns.create_midi_track(index))

    def create_return_track(self, ns):
        return Track.serialize_track(ns.create_return_track())

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

    def set_insert_mode(self,ns, args):
        self._insert_mode = INSERT_MODES.get(str(args), INSERT_MODES['default'])
        self.song.view.selected_track.view.device_insert_mode = self._insert_mode