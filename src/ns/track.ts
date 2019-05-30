import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";

export interface GettableProperties {
  arm: number;
  available_input_routing_channels: number;
  available_input_routing_types: number;
  available_output_routing_channels: number;
  available_output_routing_types: number;
  can_be_armed: number;
  can_be_frozen: number;
  can_show_chains: number;
  clip_slots: number;
  color: number;
  color_index: number;
  current_input_routing: number;
  current_input_sub_routing: number;
  current_monitoring_state: number;
  current_output_routing: number;
  current_output_sub_routing: number;
  devices: RawDevice[];
  fired_slot_index: number;
  fold_state: number;
  group_track: number;
  has_audio_input: number;
  has_audio_output: number;
  has_midi_input: number;
  has_midi_output: number;
  implicit_arm: number;
  input_meter_left: number;
  input_meter_level: number;
  input_meter_right: number;
  input_routing_channel: number;
  input_routing_type: number;
  input_routings: number;
  input_sub_routings: number;
  is_foldable: number;
  is_frozen: number;
  is_grouped: number;
  is_part_of_selection: number;
  is_showing_chains: number;
  is_visible: number;
  mixer_device: number;
  mute: number;
  muted_via_solo: number;
  name: number;
  output_meter_left: number;
  output_meter_level: number;
  output_meter_right: number;
  output_routing_channel: number;
  output_routing_type: number;
  output_routings: number;
  output_sub_routings: number;
  playing_slot_index: number;
  solo: number;
  view: number;
}

export interface TransformedProperties {
  devices: Device[];
}

export interface SettableProperties {
  arm: number;
  available_input_routing_channels: number;
  available_input_routing_types: number;
  available_output_routing_channels: number;
  available_output_routing_types: number;
  can_be_armed: number;
  can_be_frozen: number;
  can_show_chains: number;
  canonical_parent: number;
  clip_slots: number;
  color: number;
  color_index: number;
  current_input_routing: number;
  current_input_sub_routing: number;
  current_monitoring_state: number;
  current_output_routing: number;
  current_output_sub_routing: number;
  devices: number;
  fired_slot_index: number;
  fold_state: number;
  group_track: number;
  has_audio_input: number;
  has_audio_output: number;
  has_midi_input: number;
  has_midi_output: number;
  implicit_arm: number;
  input_meter_left: number;
  input_meter_level: number;
  input_meter_right: number;
  input_routing_channel: number;
  input_routing_type: number;
  input_routings: number;
  input_sub_routings: number;
  is_foldable: number;
  is_frozen: number;
  is_grouped: number;
  is_part_of_selection: number;
  is_showing_chains: number;
  is_visible: number;
  mixer_device: number;
  mute: number;
  muted_via_solo: number;
  name: number;
  output_meter_left: number;
  output_meter_level: number;
  output_meter_right: number;
  output_routing_channel: number;
  output_routing_type: number;
  output_routings: number;
  output_sub_routings: number;
  playing_slot_index: number;
  solo: number;
  view: number;
}

export interface ObservableProperties {
  arm: number;
  available_input_routing_channels: number;
  available_input_routing_types: number;
  available_output_routing_channels: number;
  available_output_routing_types: number;
  clip_slots: number;
  color_index: number;
  color: number;
  current_input_routing: number;
  current_input_sub_routing: number;
  current_monitoring_state: number;
  current_output_routing: number;
  current_output_sub_routing: number;
  data: number;
  devices: number;
  fired_slot_index: number;
  has_audio_input: number;
  has_audio_output: number;
  has_midi_input: number;
  has_midi_output: number;
  implicit_arm: number;
  input_meter_left: number;
  input_meter_level: number;
  input_meter_right: number;
  input_routing_channel: number;
  input_routing_type: number;
  input_routings: number;
  input_sub_routings: number;
  is_frozen: number;
  is_showing_chains: number;
  mute: number;
  muted_via_solo: number;
  name: number;
  output_meter_left: number;
  output_meter_level: number;
  output_meter_right: number;
  output_routing_channel: number;
  output_routing_type: number;
  output_routings: number;
  output_sub_routings: number;
  playing_slot_index: number;
  solo: number;
}

export interface RawTrack {
  id: number;
  name: string;
  color: number;
}

export class Track extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawTrack) {
    super(ableton, "track", raw.id);

    this.transformers = {
      devices: devices => devices.map(d => new Device(this.ableton, d)),
    };
  }
}
