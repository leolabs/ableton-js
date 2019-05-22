from Interface import Interface


class Song(Interface):
    def __init__(self, c_instance, socket):
        super(Song, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return self.ableton.song()

    def get_cue_points(self, ns):
        cues = []
        for cue in ns.cue_points:
            cues.append({"name": cue.name, "time": cue.time})
        return cues

    def get_clip_trigger_quantization(self, ns):
        return str(ns.clip_trigger_quantization)

    def get_midi_recording_quantization(self, ns):
        return str(ns.midi_recording_quantization)

    def jump_to_cue(self, ns, time):
        for cue in ns.cue_points:
            if cue.time == time:
                cue.jump()
                return True
        return False
