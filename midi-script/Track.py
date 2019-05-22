from Interface import Interface


class Track(Interface):
    @staticmethod
    def serialize_track(track):
        track_id = Interface.save_obj(track)
        return {"id": track_id, "name": track.name, "color": track.color}

    def __init__(self, c_instance, socket):
        super(Track, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return Interface.get_obj(nsid)
