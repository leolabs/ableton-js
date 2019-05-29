import { Ableton } from "..";
import { Namespace } from ".";
import { Track, RawTrack } from "./track";
import { CuePoint, RawCuePoint } from "./cue-point";
import { SongView } from "./song-view";

export interface GettableProperties {
  clip_slots: number;
  color: number;
  color_index: number;
  is_empty: boolean;
  is_triggered: boolean;
  name: string;
  tempo: number;
}

export interface TransformedProperties {}

export interface SettableProperties {
  clip_slots: number /* Todo: implement ClipSlot */;
  color: number;
  color_index: number;
  name: string;
  tempo: number;
}

export interface ObservableProperties {
  clip_slots: number;
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
  }
}
