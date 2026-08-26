from __future__ import absolute_import

import Live

from .Clip import Clip
from .ClipSlot import ClipSlot
from .Device import Device
from .Interface import Interface
from .MixerDevice import MixerDevice
from .TakeLane import TakeLane


class Track(Interface):
    @staticmethod
    def serialize_track(track):
        if track is None:
            return None

        track_id = Interface.save_obj(track)

        solo = False
        mute = False

        try:
            solo = track.solo
        except:
            pass

        try:
            mute = track.mute
        except:
            pass

        return {
            "id": track_id,
            "name": track.name,
            "solo": solo,
            "mute": mute,
            "color": track.color,
            "color_index": track.color_index,
            "is_foldable": track.is_foldable,
            "is_grouped": track.is_grouped,
        }

    @staticmethod
    def serialize_routing_channel(channel):
        return {
            "display_name": channel.display_name,
            "layout": str(channel.layout),
        }

    @staticmethod
    def serialize_routing_type(routing_type):
        return {
            "display_name": routing_type.display_name,
            "category": str(routing_type.category),
        }

    @staticmethod
    def _find_routing_channel(channels, value):
        display_name = value.get("display_name") if isinstance(value, dict) else value
        layout = value.get("layout") if isinstance(value, dict) else None
        for channel in channels:
            if channel.display_name != display_name:
                continue
            if layout is None or str(channel.layout) == layout:
                return channel
        raise Exception("Routing channel not found: " + str(value))

    @staticmethod
    def _find_routing_type(types, value):
        display_name = value.get("display_name") if isinstance(value, dict) else value
        category = value.get("category") if isinstance(value, dict) else None
        for routing_type in types:
            if routing_type.display_name != display_name:
                continue
            if category is None or str(routing_type.category) == category:
                return routing_type
        raise Exception("Routing type not found: " + str(value))

    def __init__(self, c_instance, socket):
        super(Track, self).__init__(c_instance, socket)

    def get_arrangement_clips(self, ns):
        return map(Clip.serialize_clip, ns.arrangement_clips)

    def get_available_input_routing_channels(self, ns):
        return map(Track.serialize_routing_channel, ns.available_input_routing_channels)

    def get_available_input_routing_types(self, ns):
        return map(Track.serialize_routing_type, ns.available_input_routing_types)

    def get_available_output_routing_channels(self, ns):
        return map(
            Track.serialize_routing_channel, ns.available_output_routing_channels
        )

    def get_available_output_routing_types(self, ns):
        return map(Track.serialize_routing_type, ns.available_output_routing_types)

    def get_devices(self, ns):
        return map(Device.serialize_device, ns.devices)

    def get_clip_slots(self, ns):
        return map(ClipSlot.serialize_clip_slot, ns.clip_slots)

    def get_current_monitoring_state(self, ns):
        return str(ns.current_monitoring_state)

    def set_current_monitoring_state(self, ns, value):
        ns.current_monitoring_state = getattr(
            Live.Track.Track.monitoring_states, str(value)
        )

    def get_group_track(self, ns):
        return Track.serialize_track(ns.group_track)

    def get_input_routing_channel(self, ns):
        return Track.serialize_routing_channel(ns.input_routing_channel)

    def set_input_routing_channel(self, ns, value):
        ns.input_routing_channel = Track._find_routing_channel(
            ns.available_input_routing_channels, value
        )

    def get_input_routing_type(self, ns):
        return Track.serialize_routing_type(ns.input_routing_type)

    def set_input_routing_type(self, ns, value):
        ns.input_routing_type = Track._find_routing_type(
            ns.available_input_routing_types, value
        )

    def get_output_routing_channel(self, ns):
        return Track.serialize_routing_channel(ns.output_routing_channel)

    def set_output_routing_channel(self, ns, value):
        ns.output_routing_channel = Track._find_routing_channel(
            ns.available_output_routing_channels, value
        )

    def get_output_routing_type(self, ns):
        return Track.serialize_routing_type(ns.output_routing_type)

    def set_output_routing_type(self, ns, value):
        ns.output_routing_type = Track._find_routing_type(
            ns.available_output_routing_types, value
        )

    def get_mixer_device(self, ns):
        return MixerDevice.serialize_mixer_device(ns.mixer_device)

    def get_take_lanes(self, ns):
        return [TakeLane.serialize_take_lane(lane) for lane in ns.take_lanes]

    def get_data(self, ns, key):
        return ns.get_data(key, None)

    def set_data(self, ns, key, value):
        return ns.set_data(key, value)

    def create_take_lane(self, ns):
        return TakeLane.serialize_take_lane(ns.create_take_lane())

    def duplicate_clip_slot(self, ns, index):
        return ns.duplicate_clip_slot(index)

    def duplicate_clip_to_arrangement(self, ns, clip_id, time):
        clip = ns.duplicate_clip_to_arrangement(self.get_obj(clip_id), time)
        return Clip.serialize_clip(clip)

    def duplicate_device(self, ns, index):
        return ns.duplicate_device(index)

    def delete_clip(self, ns, clip_id):
        return ns.delete_clip(self.get_obj(clip_id))

    def insert_device(self, ns, device_name, target_index=-1):
        device = ns.insert_device(device_name, target_index)
        return Device.serialize_device(device)

    def jump_in_running_session_clip(self, ns, beats):
        return ns.jump_in_running_session_clip(beats)

    def stop_all_clips(self, ns, quantized=True):
        return ns.stop_all_clips(quantized)

    def create_midi_clip(self, ns, start_time, length):
        clip = ns.create_midi_clip(start_time, length)
        return Clip.serialize_clip(clip)

    def create_audio_clip(self, ns, file_path, position):
        clip = ns.create_audio_clip(file_path, position)
        return Clip.serialize_clip(clip)
