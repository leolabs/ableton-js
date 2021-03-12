from __future__ import absolute_import
from .Interface import Interface
from .DeviceParameter import DeviceParameter
from .Scene import Scene
from .Track import Track
from .ClipSlot import ClipSlot


class SongView(Interface):
    def __init__(self, c_instance, socket):
        super(SongView, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return self.ableton.song().view

    def select_device(self, ns, device_id):
        return ns.select_device(Interface.get_obj(device_id))

    def get_selected_parameter(self, ns):
        return DeviceParameter.serialize_device_paramater(ns.selected_parameter)

    def get_selected_track(self, ns):
        return Track.serialize_track(ns.selected_track)

    def get_selected_scene(self, ns):
        return Scene.serialize_scene(ns.selected_scene)

    def get_highlighted_clip_slot(self, ns):
        return ClipSlot.serialize_clip_slot(ns.highlighted_clip_slot)
