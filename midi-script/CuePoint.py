from Interface import Interface


class CuePoint(Interface):
    @staticmethod
    def serialize_cue_point(cue_point):
        if cue_point is None:
            return None

        cue_point_id = Interface.save_obj(cue_point)
        return {"id": cue_point_id, "name": cue_point.name, "time": cue_point.time}

    def __init__(self, c_instance, socket):
        super(CuePoint, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return Interface.get_obj(nsid)

    def jump(self, ns):
        return ns.jump()
