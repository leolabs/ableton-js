from __future__ import absolute_import

import Live

from .DeviceParameter import DeviceParameter
from .Interface import Interface


class MixerDevice(Interface):
    @staticmethod
    def serialize_mixer_device(mixer_device):
        if mixer_device is None:
            return None

        device_id = Interface.save_obj(mixer_device)
        return {"id": device_id, "volume": mixer_device.volume}

    def __init__(self, c_instance, socket):
        super().__init__(c_instance, socket)

    def get_crossfade_assign(self, ns):
        return str(ns.crossfade_assign)

    def set_crossfade_assign(self, ns, value):
        ns.crossfade_assign = getattr(
            Live.MixerDevice.MixerDevice.crossfade_assignments, str(value)
        )

    def get_panning_mode(self, ns):
        return str(ns.panning_mode)

    def set_panning_mode(self, ns, value):
        ns.panning_mode = getattr(
            Live.MixerDevice.MixerDevice.panning_modes, str(value)
        )

    def get_crossfader(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.crossfader)

    def get_cue_volume(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.cue_volume)

    def get_left_split_stereo(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.left_split_stereo)

    def get_panning(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.panning)

    def get_right_split_stereo(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.right_split_stereo)

    def get_sends(self, ns):
        return map(DeviceParameter.serialize_device_parameter, ns.sends)

    def get_song_tempo(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.song_tempo)

    def get_track_activator(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.track_activator)

    def get_volume(self, ns):
        return DeviceParameter.serialize_device_parameter(ns.volume)
