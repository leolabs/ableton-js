import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter.js";

export interface GettableProperties {
  chain_activator: RawDeviceParameter;
  /** `null` on MIDI Effect Rack chains (no pan). */
  panning: RawDeviceParameter | null;
  sends: RawDeviceParameter[];
  /** `null` on MIDI Effect Rack chains (no volume). */
  volume: RawDeviceParameter | null;
}

export interface TransformedProperties {
  chain_activator: DeviceParameter;
  panning: DeviceParameter | null;
  sends: DeviceParameter[];
  volume: DeviceParameter | null;
}

export interface SettableProperties {}

export interface ObservableProperties {
  sends: RawDeviceParameter[];
}

export interface RawChainMixerDevice {
  readonly id: string;
  /** Display string when present; `null` on MIDI Effect chains. */
  readonly volume: string | null;
}

/**
 * Mixer for a rack chain: chain activator, volume, pan, and sends.
 */
export class ChainMixerDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawChainMixerDevice,
  ) {
    super(ableton, "chain-mixer-device", raw.id);

    this.transformers = {
      chain_activator: (v) => new DeviceParameter(ableton, v),
      panning: (v) => (v ? new DeviceParameter(ableton, v) : null),
      sends: (v) => v.map((s) => new DeviceParameter(ableton, s)),
      volume: (v) => (v ? new DeviceParameter(ableton, v) : null),
    };
  }
}
