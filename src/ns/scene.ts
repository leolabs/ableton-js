import { Ableton } from "..";
import { Namespace } from ".";
import { Track, RawTrack } from "./track";
import { CuePoint, RawCuePoint } from "./cue-point";
import { SongView } from "./song-view";
import { ClipSlot, RawClipSlot } from './clip-slot';

export interface GettableProperties {
  clip_slots: RawClipSlot[];
  color: number;
  color_index: number;
  is_empty: boolean;
  is_triggered: boolean;
  name: string;
  tempo: number;
}

export interface TransformedProperties {
  clip_slots: ClipSlot[];
}

export interface SettableProperties {
  clip_slots: RawClipSlot[];
  color: number;
  color_index: number;
  name: string;
  tempo: number;
}

export interface ObservableProperties {
  clip_slots: RawClipSlot[];
  color: number;
  color_index: number;
  is_triggered: boolean;
  name: string;
}

export interface RawScene {
  color: number;
  id: number;
  name: string;
}

export class Scene extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawScene) {
    super(ableton, "scene");

    this.transformers = {
      clip_slots: clip_slots => clip_slots.map(c => new ClipSlot(this.ableton, c)),
    };
  }
}
