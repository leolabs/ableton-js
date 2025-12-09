import { Ableton } from "../index.js";
import { Namespace } from "./index.js";

export interface GettableProperties {
  name: string;
  time: number;
}

export interface TransformedProperties {}

export interface SettableProperties {}

export interface ObservableProperties {
  name: string;
  time: number;
}

export interface RawCuePoint {
  readonly id: string;
  readonly name: string;
  readonly time: number;
}

export class CuePoint extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public raw: RawCuePoint,
  ) {
    super(ableton, "cue-point", raw.id);
  }

  async jump() {
    return this.sendCommand("jump");
  }
}
