import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Groove, RawGroove } from "./groove.js";

export interface GettableProperties {
  grooves: RawGroove[];
}

export interface TransformedProperties {
  grooves: Groove[];
}

export interface SettableProperties {}

export interface ObservableProperties {
  grooves: RawGroove[];
}

export class GroovePool extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "groove-pool");

    this.transformers = {
      grooves: (grooves) => grooves.map((g) => new Groove(ableton, g)),
    };

    this.cachedProps = {
      grooves: true,
    };
  }
}
