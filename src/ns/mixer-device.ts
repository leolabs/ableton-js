import { Ableton } from "..";
import { Namespace } from ".";

export type TrackActivator = "On" | "Off";

export type PanningLeft = `${number}L`;
export type PanningRight = `${number}R`;
export type Panning = "C" | PanningLeft | PanningRight;

export type Crossfader = "0" | `${number}A` | `${number}B`;

export type Volume = `${number | "-inf"} dB`;

export enum PanningMode {
  Stereo,
  StereoSplit,
}

export enum CrossfadeAssignment {
  A,
  None,
  B,
}

export interface GettableProperties {
  crossfade_assign: CrossfadeAssignment;
  crossfader: number;
  cue_volume: Volume;
  left_split_stereo: PanningLeft;
  panning: Panning;
  panning_mode: PanningMode;
  right_split_stereo: PanningRight;
  sends: Volume[];
  song_tempo: number;
  track_activator: TrackActivator;
  volume: Volume;
}

export interface TransformedProperties {}

export interface SettableProperties {
  crossfade_assign: CrossfadeAssignment;
  panning_mode: string;
}

export interface ObservableProperties {
  crossfade_assign: CrossfadeAssignment;
  panning_mode: string;
  sends: Volume[];
}

export interface RawMixerDevice {
  id: string;
  volume: string;
  track_activator: TrackActivator;
}

export class MixerDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawMixerDevice) {
    super(ableton, "mixer-device", raw.id);
  }
}
