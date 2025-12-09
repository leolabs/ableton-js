import { Namespace } from "./index.js";
import { Ableton } from "../index.js";
import { Clip, RawClip } from "./clip.js";
import { ClipSlot, RawClipSlot } from "./clip-slot.js";
import { Device } from "./device.js";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter.js";
import { RawScene, Scene } from "./scene.js";
import { RawTrack, Track } from "./track.js";

export interface GettableProperties {
  detail_clip: RawClip;
  draw_mode: boolean;
  follow_song: boolean;
  highlighted_clip_slot: RawClipSlot;
  selected_chain: any /* Todo: Implement Chain class */;
  selected_parameter: RawDeviceParameter;
  selected_scene: RawScene;
  selected_track: RawTrack;
}

export interface TransformedProperties {
  detail_clip: Clip;
  selected_parameter: DeviceParameter;
  selected_scene: Scene;
  selected_track: Track;
  highlighted_clip_slot: ClipSlot;
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
  highlighted_clip_slot: any;
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
      selected_parameter: (param) => new DeviceParameter(ableton, param),
      selected_track: (track) => new Track(ableton, track),
      selected_scene: (scene) => new Scene(ableton, scene),
      highlighted_clip_slot: (slot) => new ClipSlot(ableton, slot),
      detail_clip: (clip) => new Clip(ableton, clip),
    };

    this.cachedProps = {
      detail_clip: true,
      selected_parameter: true,
      selected_track: true,
      selected_scene: true,
      highlighted_clip_slot: true,
    };
  }

  async selectDevice(device: Device) {
    return this.ableton.sendCommand({
      ns: this.ns,
      name: "select_device",
      args: { device_id: device.raw.id },
    });
  }
}
