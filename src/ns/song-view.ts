import { Ableton } from "..";
import { Namespace } from ".";
import { Device } from "./device";
import { Track, RawTrack } from "./track";
import { Scene, RawScene } from "./scene";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter";
import { ClipSlot, RawClipSlot } from "./clip-slot";

export interface GettableProperties {
  detail_clip: any /* Todo: Implement Clip class */;
  draw_mode: boolean;
  follow_song: boolean;
  highlighted_clip_slot: RawClipSlot;
  selected_chain: any /* Todo: Implement Chain class */;
  selected_parameter: RawDeviceParameter;
  selected_scene: RawScene;
  selected_track: RawTrack;
}

export interface TransformedProperties {
  selected_parameter: DeviceParameter;
  selected_scene: Scene;
  selected_track: Track;
  highlighted_clip_slot: ClipSlot;
}

export interface SettableProperties {
  detail_clip: any;
  draw_mode: boolean;
  follow_song: boolean;
  highlighted_clip_slot: number;
  selected_scene: RawScene['id'];
  selected_track: RawTrack['id'];
}

export interface ObservableProperties {
  detail_clip: any;
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
    };

    this.cachedProps = {
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
