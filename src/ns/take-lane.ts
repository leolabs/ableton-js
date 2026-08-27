import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Clip, RawClip } from "./clip.js";

export interface GettableProperties {
  arrangement_clips: RawClip[];
  name: string;
}

export interface TransformedProperties {
  arrangement_clips: Clip[];
}

export interface SettableProperties {
  name: string;
}

export interface ObservableProperties {
  arrangement_clips: RawClip[];
  name: string;
}

export interface RawTakeLane {
  readonly id: string;
  readonly name: string;
}

export class TakeLane extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawTakeLane,
  ) {
    super(ableton, "take-lane", raw.id);

    this.transformers = {
      arrangement_clips: (clips) => clips.map((c) => new Clip(ableton, c)),
    };

    this.cachedProps = {
      arrangement_clips: true,
    };
  }

  /** Creates an audio clip in this take lane's arrangement at `startTime`. */
  public async createAudioClip(filePath: string, startTime: number) {
    const rawClip = await this.sendCommand("create_audio_clip", {
      file_path: filePath,
      start_time: startTime,
    });
    return new Clip(this.ableton, rawClip);
  }

  /** Creates an empty MIDI clip in this take lane's arrangement. */
  public async createMidiClip(startTime: number, length: number) {
    const rawClip = await this.sendCommand("create_midi_clip", {
      start_time: startTime,
      length: length,
    });
    return new Clip(this.ableton, rawClip);
  }
}
