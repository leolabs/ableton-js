from __future__ import absolute_import

from .Device import Device


class PluginDevice(Device):
    def get_presets(self, ns):
        return list(ns.presets)

    def get_parameter_names(self, ns, begin=0, end=-1):
        return list(ns.get_parameter_names(int(begin), int(end)))

    def set_selected_preset_index(self, ns, value):
        ns.selected_preset_index = int(value)
