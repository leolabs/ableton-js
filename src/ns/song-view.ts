import type { Ableton } from "../index.js";
import { Clip, type RawClip } from "./clip.js";
import { ClipSlot, type RawClipSlot } from "./clip-slot.js";
import type { Device } from "./device.js";
import {
  DeviceParameter,
  type RawDeviceParameter,
} from "./device-parameter.js";
import { Namespace } from "./index.js";
import { type RawScene, Scene } from "./scene.js";
import { type RawTrack, Track } from "./track.js";

export interface GettableProperties {
  detail_clip: RawClip | null;
  draw_mode: boolean;
  follow_song: boolean;
  highlighted_clip_slot: RawClipSlot | null;
  selected_chain: any /* Todo: Implement Chain class */;
  selected_parameter: RawDeviceParameter | null;
  selected_scene: RawScene | null;
  selected_track: RawTrack | null;
}

export interface TransformedProperties {
  detail_clip: Clip | null;
  selected_parameter: DeviceParameter | null;
  selected_scene: Scene | null;
  selected_track: Track | null;
  highlighted_clip_slot: ClipSlot | null;
}

export interface SettableProperties {
  detail_clip: RawClip["id"];
  draw_mode: boolean;
  follow_song: boolean;
  highlighted_clip_slot: number;
  selected_scene: RawScene["id"];
  selected_track: RawTrack["id"];
}

export interface ObservableProperties {
  detail_clip: RawClip | null;
  draw_mode: any;
  follow_song: any;
  selected_chain: any;
  selected_parameter: any;
  selected_scene: RawScene | null;
  selected_track: RawTrack | null;
}

export class SongView extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "song-view");

    this.transformers = {
      selected_parameter: (param) =>
        param ? new DeviceParameter(ableton, param) : null,
      selected_track: (track) => (track ? new Track(ableton, track) : null),
      selected_scene: (scene) => (scene ? new Scene(ableton, scene) : null),
      highlighted_clip_slot: (slot) =>
        slot ? new ClipSlot(ableton, slot) : null,
      detail_clip: (clip) => (clip ? new Clip(ableton, clip) : null),
    };

    this.cachedProps = {
      detail_clip: true,
      selected_parameter: true,
      selected_track: true,
      selected_scene: true,
      highlighted_clip_slot: true,
    };
  }

  /** Selects the given device in Live. */
  public async selectDevice(deviceOrId: Device | string) {
    return this.ableton.sendCommand({
      ns: this.ns,
      name: "select_device",
      args: {
        device_id:
          typeof deviceOrId === "string" ? deviceOrId : deviceOrId.raw.id,
      },
    });
  }
}
