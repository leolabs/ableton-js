from Interface import Interface


class Song(Interface):
    def __init__(self, c_instance, socket, log):
        super(Song, self).__init__(c_instance, socket, log)
        self.ns = self.ableton.song()

    def get_cue_points(self):
        cues = []
        for cue in self.ns.cue_points:
            cues.append({"name": cue.name, "time": cue.time})
        return cues

    def jump_to_cue(self, time):
        for cue in self.ns.cue_points:
            if cue.time == time:
                cue.jump()
                return True
        return False
