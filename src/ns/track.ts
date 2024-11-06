import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { ClipSlot, RawClipSlot } from "./clip-slot";
import { MixerDevice, RawMixerDevice } from "./mixer-device";
import { Clip, RawClip } from "./clip";
import { Color } from "../util/color";
import { TrackView } from "./track-view";

export enum RoutingLayout {
  Mono = 1,
  Stereo = 2,
}

export interface RoutingChannel {
  display_name: string;
  layout: RoutingLayout;
}

export enum RoutingCategory {
  External,
  Rewire,
  Resampling,
  Master,
  Track,
  ParentGroupTrack,
  None,
  Invalid,
}

export interface RoutingType {
  display_name: string;
  category: RoutingCategory;
}

// TODO: Implement commented-out properties properly
export interface GettableProperties {
  arm: boolean;
  arrangement_clips: RawClip[];
  available_input_routing_channels: RoutingChannel[];
  available_input_routing_types: RoutingType[];
  available_output_routing_channels: RoutingChannel[];
  available_output_routing_types: RoutingType[];
  can_be_armed: boolean;
  can_be_frozen: boolean;
  can_show_chains: boolean;
  canonical_parent: number;
  clip_slots: RawClipSlot[];
  color: number;
  color_index: number;
  current_input_routing: string;
  current_input_sub_routing: string;
  current_monitoring_state: number;
  current_output_routing: string;
  current_output_sub_routing: string;
  devices: RawDevice[];
  fired_slot_index: number;
  fold_state: boolean;
  group_track: RawTrack | null;
  has_audio_input: boolean;
  has_audio_output: boolean;
  has_midi_input: boolean;
  has_midi_output: boolean;
  implicit_arm: number;
  input_meter_left: number;
  input_meter_level: number;
  input_meter_right: number;
  // input_routing_channel: unknown;
  // input_routing_type: unknown;
  // input_routings: unknown;
  // input_sub_routings: unknown;
  is_foldable: boolean;
  is_frozen: boolean;
  is_grouped: boolean;
  is_part_of_selection: boolean;
  is_showing_chains: boolean;
  is_visible: boolean;
  mixer_device: RawMixerDevice;
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  output_meter_left: number;
  output_meter_level: number;
  output_meter_right: number;
  // output_routing_channel: unknown;
  // output_routing_type: unknown;
  // output_routings: unknown;
  // output_sub_routings: unknown;
  playing_slot_index: number;
  solo: number;
  //view: unknown;
}

export interface TransformedProperties {
  color: Color;
  devices: Device[];
  clip_slots: ClipSlot[];
  arrangement_clips: Clip[];
  mixer_device: MixerDevice;
}

export interface SettableProperties {
  arm: boolean;
  color: number;
  color_index: number;
  current_input_routing: string;
  current_input_sub_routing: string;
  current_monitoring_state: number;
  current_output_routing: string;
  current_output_sub_routing: string;
  fired_slot_index: number;
  fold_state: number;
  implicit_arm: boolean;
  input_routing_channel: number;
  input_routing_type: number;
  input_routings: number;
  input_sub_routings: number;
  is_showing_chains: number;
  mute: boolean;
  name: string;
  output_routing_channel: number;
  output_routing_type: number;
  output_routings: number;
  output_sub_routings: number;
  playing_slot_index: number;
  solo: boolean;
}

export interface ObservableProperties {
  arm: number;
  arrangement_clips: RawClip[];
  // available_input_routing_channels: number;
  // available_input_routing_types: number;
  // available_output_routing_channels: number;
  // available_output_routing_types: number;
  clip_slots: RawClipSlot[];
  color_index: number;
  color: number;
  current_input_routing: string;
  current_input_sub_routing: string;
  current_monitoring_state: number;
  current_output_routing: string;
  current_output_sub_routing: string;
  devices: RawDevice[];
  fired_slot_index: number;
  has_audio_input: boolean;
  has_audio_output: boolean;
  has_midi_input: boolean;
  has_midi_output: boolean;
  implicit_arm: boolean;
  input_meter_left: number;
  input_meter_level: number;
  input_meter_right: number;
  // input_routing_channel: string;
  // input_routing_type: string;
  // input_routings: string;
  // input_sub_routings: string;
  is_frozen: number;
  is_showing_chains: number;
  mute: number;
  muted_via_solo: number;
  name: string;
  output_meter_left: number;
  output_meter_level: number;
  output_meter_right: number;
  // output_routing_channel: number;
  // output_routing_type: number;
  // output_routings: number;
  // output_sub_routings: number;
  playing_slot_index: number;
  solo: boolean;
}

export interface RawTrack {
  id: string;
  name: string;
  color: number;
  color_index: number;
  is_foldable: boolean;
  is_grouped: boolean;
  mute: boolean;
  solo: boolean;
}

export class Track extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  view: TrackView;

  constructor(ableton: Ableton, public raw: RawTrack) {
    super(ableton, "track", raw.id);
    this.view = new TrackView(this.ableton, raw.id);

    this.transformers = {
      arrangement_clips: (clips: RawClip[]) =>
        clips.map((clip) => new Clip(ableton, clip)),
      color: (c) => new Color(c),
      devices: (devices) => devices.map((d) => new Device(ableton, d)),
      clip_slots: (clip_slots) =>
        clip_slots.map((c) => new ClipSlot(ableton, c)),
      mixer_device: (mixer_device) => new MixerDevice(ableton, mixer_device),
    };

    this.cachedProps = {
      arrangement_clips: true,
      devices: true,
      clip_slots: true,
    };
  }

  /**
   * Duplicates the given clip into the arrangement of this track at the provided destination time and returns it.
   * When the type of the clip and the type of the track are incompatible, a runtime error is raised.
   */
  duplicateClipToArrangement(clipOrId: Clip | string, time: number) {
    return this.sendCommand("duplicate_clip_to_arrangement", {
      clip_id: typeof clipOrId === "string" ? clipOrId : clipOrId.raw.id,
      time: time,
    });
  }
}
