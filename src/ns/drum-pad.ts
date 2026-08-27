import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { DrumChain, RawDrumChain } from "./drum-chain.js";

export interface GettableProperties {
  chains: RawDrumChain[];
  mute: boolean;
  name: string;
  note: number | null;
  solo: boolean;
}

export interface TransformedProperties {
  chains: DrumChain[];
}

export interface SettableProperties {
  mute: boolean;
  solo: boolean;
}

export interface ObservableProperties {
  chains: RawDrumChain[];
  mute: boolean;
  name: string;
  solo: boolean;
}

export interface RawDrumPad {
  readonly id: string;
  readonly name: string;
  readonly note: number | null;
  readonly mute: boolean;
  readonly solo: boolean;
}

/**
 * Represents a single pad of a Drum Rack device. Reach a pad's own device
 * chain (e.g. its Simpler) via `chains` - a pad usually has 0 or 1 chains.
 */
export class DrumPad extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawDrumPad,
  ) {
    super(ableton, "drum-pad", raw.id);

    this.transformers = {
      chains: (chains) => chains.map((c) => new DrumChain(ableton, c)),
    };

    this.cachedProps = {
      chains: true,
    };
  }

  /** Deletes all chains on this pad (same as clearing a drum rack pad in Live). */
  deleteAllChains() {
    return this.sendCommand("delete_all_chains");
  }
}
