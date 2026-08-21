from __future__ import absolute_import

from .Device import Device
from .Interface import Interface


class LooperDevice(Device):
    def get_record_length_list(self, ns):
        return list(ns.record_length_list)

    def set_record_length_index(self, ns, value):
        ns.record_length_index = int(value)

    def set_tempo(self, ns, value):
        ns.tempo = float(value)

    def export_to_clip_slot(self, ns, slot_id):
        ns.export_to_clip_slot(Interface.get_obj(slot_id))
