import { Ableton } from "../index.js";
import { Namespace } from "./index.js";

export interface GettableProperties {}

export interface TransformedProperties {}

export interface SettableProperties {}

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

  /** Creates the Session View highlight ("red box") with the given size. */
  public async setupSessionBox(num_tracks: number, num_scenes: number) {
    return this.sendCommand("setup_session_box", { num_tracks, num_scenes });
  }

  /** Moves the Session View highlight to the given track and scene offsets. */
  public async setSessionOffset(track_offset: number, scene_offset: number) {
    return this.sendCommand("set_session_offset", {
      track_offset,
      scene_offset,
    });
  }
}
