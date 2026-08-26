import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { RawDevice, wrapDevice, Device } from "./device.js";
import { ClipSlot, RawClipSlot } from "./clip-slot.js";
import { MixerDevice, RawMixerDevice } from "./mixer-device.js";
import { Clip, RawClip } from "./clip.js";
import { Color } from "../util/color.js";
import { TrackView } from "./track-view.js";
import { TakeLane, RawTakeLane } from "./take-lane.js";

export type RoutingLayout = "midi" | "mono" | "stereo";

export interface RoutingChannel {
  display_name: string;
  layout: RoutingLayout;
}

export type RoutingCategory =
  | "external"
  | "rewire"
  | "resampling"
  | "master"
  | "track"
  | "parent_group_track"
  | "none"
  | "invalid";

export interface RoutingType {
  display_name: string;
  category: RoutingCategory;
}

/** Live's `Track.monitoring_states`. */
export type MonitoringState = "IN" | "AUTO" | "OFF";

export interface GettableProperties {
  arm: boolean;
  arrangement_clips: RawClip[];
  available_input_routing_channels: RoutingChannel[];
  available_input_routing_types: RoutingType[];
  available_output_routing_channels: RoutingChannel[];
  available_output_routing_types: RoutingType[];
  back_to_arranger: boolean;
  can_be_armed: boolean;
  can_be_frozen: boolean;
  can_show_chains: boolean;
  clip_slots: RawClipSlot[];
  color: number;
  color_index: number;
  current_input_routing: string;
  current_input_sub_routing: string;
  current_monitoring_state: MonitoringState;
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
  implicit_arm: boolean;
  input_meter_left: number;
  input_meter_level: number;
  input_meter_right: number;
  input_routing_channel: RoutingChannel;
  input_routing_type: RoutingType;
  input_routings: string[];
  input_sub_routings: string[];
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
  output_routing_channel: RoutingChannel;
  output_routing_type: RoutingType;
  output_routings: string[];
  output_sub_routings: string[];
  performance_impact: number;
  playing_slot_index: number;
  solo: boolean;
  take_lanes: RawTakeLane[];
  // view: exposed as track.view
}

export interface TransformedProperties {
  color: Color;
  devices: Device[];
  clip_slots: ClipSlot[];
  arrangement_clips: Clip[];
  group_track: Track | null;
  mixer_device: MixerDevice;
  take_lanes: TakeLane[];
}

export interface SettableProperties {
  arm: boolean;
  back_to_arranger: boolean;
  color: number;
  color_index: number;
  current_input_routing: string;
  current_input_sub_routing: string;
  current_monitoring_state: MonitoringState;
  current_output_routing: string;
  current_output_sub_routing: string;
  fold_state: boolean;
  implicit_arm: boolean;
  input_routing_channel: RoutingChannel | string;
  input_routing_type: RoutingType | string;
  is_showing_chains: boolean;
  mute: boolean;
  name: string;
  output_routing_channel: RoutingChannel | string;
  output_routing_type: RoutingType | string;
  solo: boolean;
}

export interface ObservableProperties {
  arm: boolean;
  arrangement_clips: RawClip[];
  available_input_routing_channels: RoutingChannel[];
  available_input_routing_types: RoutingType[];
  available_output_routing_channels: RoutingChannel[];
  available_output_routing_types: RoutingType[];
  back_to_arranger: boolean;
  clip_slots: RawClipSlot[];
  color_index: number;
  color: number;
  current_input_routing: string;
  current_input_sub_routing: string;
  current_monitoring_state: MonitoringState;
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
  input_routing_channel: RoutingChannel;
  input_routing_type: RoutingType;
  input_routings: string[];
  input_sub_routings: string[];
  is_frozen: boolean;
  is_showing_chains: boolean;
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  output_meter_left: number;
  output_meter_level: number;
  output_meter_right: number;
  output_routing_channel: RoutingChannel;
  output_routing_type: RoutingType;
  output_routings: string[];
  output_sub_routings: string[];
  performance_impact: number;
  playing_slot_index: number;
  solo: boolean;
  take_lanes: RawTakeLane[];
}

export interface RawTrack {
  readonly id: string;
  readonly name: string;
  readonly color: number;
  readonly color_index: number;
  readonly is_foldable: boolean;
  readonly is_grouped: boolean;
  readonly mute: boolean;
  readonly solo: boolean;
}

export class Track extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  public readonly view: TrackView;

  constructor(
    ableton: Ableton,
    public readonly raw: RawTrack,
  ) {
    super(ableton, "track", raw.id);
    this.view = new TrackView(this.ableton, raw.id);

    this.transformers = {
      arrangement_clips: (clips: RawClip[]) =>
        clips.map((clip) => new Clip(ableton, clip)),
      color: (c) => new Color(c),
      devices: (devices) => devices.map((d) => wrapDevice(ableton, d)),
      clip_slots: (clip_slots) =>
        clip_slots.map((c) => new ClipSlot(ableton, c)),
      group_track: (t) => (t ? new Track(ableton, t) : null),
      mixer_device: (mixer_device) => new MixerDevice(ableton, mixer_device),
      take_lanes: (lanes) => lanes.map((l) => new TakeLane(ableton, l)),
    };

    this.cachedProps = {
      arrangement_clips: true,
      devices: true,
      clip_slots: true,
      group_track: true,
      take_lanes: true,
    };
  }

  /**
   * Duplicates the given clip into the arrangement of this track at the provided destination time and returns it.
   * When the type of the clip and the type of the track are incompatible, a runtime error is raised.
   */
  async duplicateClipToArrangement(clipOrId: Clip | string, time: number) {
    const rawClip = await this.sendCommand("duplicate_clip_to_arrangement", {
      clip_id: typeof clipOrId === "string" ? clipOrId : clipOrId.raw.id,
      time: time,
    });
    return new Clip(this.ableton, rawClip);
  }

  /**
   * Deletes the given clip from the arrangement of this track.
   * Raises a runtime error when the clip belongs to another track
   */
  async deleteClip(clipOrId: Clip | string) {
    return this.sendCommand("delete_clip", {
      clip_id: typeof clipOrId === "string" ? clipOrId : clipOrId.raw.id,
    });
  }

  /**
   * Delete a device identified by the index in the 'devices' list of current track
   */
  async deleteDevice(index: number) {
    return this.sendCommand("delete_device", [index]);
  }

  /**
   * Duplicates the device at `index` in this track's device chain.
   */
  async duplicateDevice(index: number) {
    return this.sendCommand("duplicate_device", { index });
  }

  /**
   * Duplicates the clip slot at `index` into the next free slot.
   * Returns the destination slot index (creates a scene if needed).
   */
  async duplicateClipSlot(index: number): Promise<number> {
    return this.sendCommand("duplicate_clip_slot", { index });
  }

  /**
   * Creates a take lane for this track (Arrangement View comping).
   */
  async createTakeLane() {
    const raw = await this.sendCommand("create_take_lane");
    return new TakeLane(this.ableton, raw);
  }

  /**
   * Inserts a native Live device by UI name at `targetIndex` (-1 = end).
   * Available since Live 12.3.
   */
  async insertDevice(deviceName: string, targetIndex = -1) {
    const raw = await this.sendCommand("insert_device", {
      device_name: deviceName,
      target_index: targetIndex,
    });
    return wrapDevice(this.ableton, raw);
  }

  /**
   * Jumps forward/backward in the currently running Session clip by `beats`.
   */
  async jumpInRunningSessionClip(beats: number) {
    return this.sendCommand("jump_in_running_session_clip", { beats });
  }

  /** Stops playing all fired clips on this track. */
  async stopAllClips(quantized = true) {
    return this.sendCommand("stop_all_clips", { quantized });
  }

  async getData(key: string) {
    return this.sendCachedCommand("get_data", { key });
  }

  async setData(key: string, value: unknown) {
    return this.sendCommand("set_data", { key, value });
  }

  /**
   * Creates an audio clip referencing `filePath` and inserts it into the
   * arrangement at `position`. Only works on audio tracks.
   */
  async createAudioClip(filePath: string, position: number) {
    const rawClip = await this.sendCommand("create_audio_clip", {
      file_path: filePath,
      position,
    });
    return new Clip(this.ableton, rawClip);
  }

  /**
   * Creates an empty MIDI clip in the arrangement at the specified time.
   * Only works on MIDI tracks. Throws an error if the track is frozen
   * or if the track is currently recording.
   * The time must be within the range [0, 1576800].
   *
   * Available since Live 12.2
   */
  async createMidiClip(startTime: number, length: number) {
    const rawClip = await this.sendCommand("create_midi_clip", {
      start_time: startTime,
      length: length,
    });
    return new Clip(this.ableton, rawClip);
  }
}
