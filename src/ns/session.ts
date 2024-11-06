import { Ableton } from "..";
import { Namespace } from ".";

export interface GettableProperties {}

export interface TransformedProperties {}

export interface SettableProperties {
  test: string;
}

export interface ObservableProperties {}

export class Session extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "session", undefined);
  }

  public async setupSessionBox(num_tracks: number, num_scenes: number) {
    return this.sendCommand("setup_session_box", { num_tracks, num_scenes });
  }

  public async setSessionOffset(track_offset: number, scene_offset: number) {
    return this.sendCommand("set_session_offset", {
      track_offset,
      scene_offset,
    });
  }
}
