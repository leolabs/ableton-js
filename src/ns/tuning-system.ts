import { Ableton } from "../index.js";
import { Namespace } from "./index.js";

/** Note index within the pseudo-octave plus octave number. */
export interface PitchClassAndOctave {
  index_in_octave: number;
  octave: number;
}

/** Reference pitch used by the active tuning system. */
export interface ReferencePitch {
  index_in_octave: number;
  octave: number;
  /** Frequency in Hz. */
  frequency: number;
}

export interface GettableProperties {
  highest_note: PitchClassAndOctave;
  lowest_note: PitchClassAndOctave;
  name: string;
  note_tunings: number[];
  number_of_notes_in_pseudo_octave: number;
  pseudo_octave_in_cents: number;
  reference_pitch: ReferencePitch;
}

export interface TransformedProperties {}

export interface SettableProperties {
  highest_note: PitchClassAndOctave;
  lowest_note: PitchClassAndOctave;
  name: string;
  note_tunings: number[];
  reference_pitch: ReferencePitch;
}

export interface ObservableProperties {
  highest_note: PitchClassAndOctave;
  lowest_note: PitchClassAndOctave;
  name: string;
  note_tunings: number[];
  reference_pitch: ReferencePitch;
}

export interface RawTuningSystem {
  readonly id: string;
  readonly name: string;
}

export class TuningSystem extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawTuningSystem,
  ) {
    super(ableton, "tuning-system", raw.id);
  }
}
