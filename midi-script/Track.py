from Interface import Interface
from Device import Device
from ClipSlot import ClipSlot


class Track(Interface):
    @staticmethod
    def serialize_track(track):
        if track is None:
            return None

        track_id = Interface.save_obj(track)
        return {"id": track_id, "name": track.name, "color": track.color}

    def __init__(self, c_instance, socket):
        super(Track, self).__init__(c_instance, socket)

    def get_devices(self, ns):
        return map(Device.serialize_device, ns.devices)

    def get_clip_slots(self, ns):
        return map(ClipSlot.serialize_clip_slot, ns.clip_slots)
