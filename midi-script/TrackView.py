from __future__ import absolute_import
from .Interface import Interface
from .Device import Device

import Live

INSERT_MODES = {'default': Live.Track.DeviceInsertMode.default,
                'left': Live.Track.DeviceInsertMode.selected_left,
                'right': Live.Track.DeviceInsertMode.selected_right}


class TrackView(Interface):
    def __init__(self, c_instance, socket):
        super(TrackView, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return Interface.obj_ids[nsid].view

    def get_selected_device(self, ns):
        return Device.serialize_device(ns.selected_device)

    def set_device_insert_mode(self, ns, name):
        mode = INSERT_MODES.get(str(name), INSERT_MODES['default'])
        ns.device_insert_mode = mode
