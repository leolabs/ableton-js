from __future__ import absolute_import

import Live

from .Device import Device
from .Interface import Interface


class TrackView(Interface):
    def __init__(self, c_instance, socket):
        super(TrackView, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return Interface.get_obj(nsid).view

    def get_selected_device(self, ns):
        return Device.serialize_device(ns.selected_device)

    def set_device_insert_mode(self, ns, name):
        ns.device_insert_mode = getattr(Live.Track.DeviceInsertMode, str(name))
