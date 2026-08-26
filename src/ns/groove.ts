import { Ableton } from "../index.js";
import { Namespace } from "./index.js";

export type GrooveBase =
  | "gb_four"
  | "gb_eight"
  | "gb_eight_triplet"
  | "gb_sixteen"
  | "gb_sixteen_triplet"
  | "gb_thirtytwo";

export interface GettableProperties {
  base: GrooveBase;
  name: string;
  quantization_amount: number;
  random_amount: number;
  timing_amount: number;
  velocity_amount: number;
}

export interface TransformedProperties {}

export interface SettableProperties {
  base: GrooveBase;
  name: string;
  quantization_amount: number;
  random_amount: number;
  timing_amount: number;
  velocity_amount: number;
}

export interface ObservableProperties {
  name: string;
  quantization_amount: number;
  random_amount: number;
  timing_amount: number;
  velocity_amount: number;
}

export interface RawGroove {
  readonly id: string;
  readonly name: string;
}

export class Groove extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawGroove,
  ) {
    super(ableton, "groove", raw.id);
  }
}
