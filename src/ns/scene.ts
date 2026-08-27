import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { ClipSlot, RawClipSlot } from "./clip-slot.js";
import { Color } from "../util/color.js";

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
  color: Color;
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
  readonly color: number;
  readonly id: string;
  readonly name: string;
}

export class Scene extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawScene,
  ) {
    super(ableton, "scene", raw.id);

    this.transformers = {
      color: (c) => new Color(c),
      clip_slots: (clip_slots) =>
        clip_slots.map((c) => new ClipSlot(this.ableton, c)),
    };

    this.cachedProps = {
      clip_slots: true,
    };
  }

  /**
   * Fires the scene directly. Fires all clip slots
   * that this scene owns and selects the scene itself.
   */
  public async fire() {
    return this.sendCommand("fire");
  }
}
