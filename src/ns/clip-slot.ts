import { Ableton } from "..";
import { Namespace } from ".";

export interface GettableProperties {
  color: number;
  has_clip: boolean,
  is_playing: boolean,
  is_recording: boolean,
  is_triggered: boolean
}

export interface TransformedProperties {}

export interface SettableProperties {
  name: string;
  color: number;
}

export interface ObservableProperties {
  color: number;
  has_clip: boolean,
  is_playing: boolean,
  is_recording: boolean,
  is_triggered: boolean
}

export interface RawClipSlot {
  id: number;
  color: number;
  has_clip: boolean,
  is_playing: boolean,
  is_recording: boolean,
  is_triggered: boolean
}

export class ClipSlot extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawClipSlot) {
    super(ableton, "clip_slot", raw.id);
  }
}
