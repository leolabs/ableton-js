import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import {
  Chain,
  GettableProperties as ChainGettableProperties,
  ObservableProperties as ChainObservableProperties,
  RawChain,
  SettableProperties as ChainSettableProperties,
  TransformedProperties as ChainTransformedProperties,
} from "./chain.js";
import { wrapDevice } from "./device.js";
import { ChainMixerDevice } from "./chain-mixer-device.js";

export interface GettableProperties extends ChainGettableProperties {
  /** Choke group index for this drum chain. */
  choke_group: number;
  /** MIDI note that triggers this chain. */
  in_note: number;
  /** MIDI note this chain outputs. */
  out_note: number;
}

export interface TransformedProperties extends ChainTransformedProperties {}

export interface SettableProperties extends ChainSettableProperties {
  choke_group: number;
  in_note: number;
  out_note: number;
}

export interface ObservableProperties extends ChainObservableProperties {
  choke_group: number;
  in_note: number;
  out_note: number;
}

export interface RawDrumChain extends RawChain {
  readonly is_drum_chain: true;
  readonly choke_group: number;
  readonly in_note: number;
  readonly out_note: number;
}

export type AnyChain = Chain | DrumChain;

/**
 * A chain inside a Drum Rack (pad chain or drum-rack chain), with note and
 * choke-group controls beyond a regular {@link Chain}.
 */
export class DrumChain extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawDrumChain,
  ) {
    super(ableton, "drum-chain", raw.id);

    this.transformers = {
      devices: (devices) => devices.map((d) => wrapDevice(ableton, d)),
      mixer_device: (m) => new ChainMixerDevice(ableton, m),
    };

    this.cachedProps = {
      devices: true,
      mixer_device: true,
    };
  }

  /**
   * Deletes a device identified by its index in this chain's `devices` list.
   */
  deleteDevice(index: number) {
    return this.sendCommand("delete_device", { index });
  }

  /** Duplicates the device at `index` in this chain. */
  duplicateDevice(index: number) {
    return this.sendCommand("duplicate_device", { index });
  }

  /**
   * Inserts a native Live device by UI name at `deviceIndex` (-1 = end).
   * Available since Live 12.3.
   */
  async insertDevice(deviceName: string, deviceIndex = -1) {
    const raw = await this.sendCommand("insert_device", {
      device_name: deviceName,
      device_index: deviceIndex,
    });
    return wrapDevice(this.ableton, raw);
  }
}

/**
 * Wraps a serialized chain as {@link DrumChain} when Live reports drum-chain
 * fields, otherwise as {@link Chain}.
 */
export function wrapChain(ableton: Ableton, raw: RawChain): AnyChain {
  if (raw.is_drum_chain) {
    return new DrumChain(ableton, raw as RawDrumChain);
  }
  return new Chain(ableton, raw);
}

export function isDrumChain(chain: AnyChain): chain is DrumChain {
  return chain instanceof DrumChain;
}
