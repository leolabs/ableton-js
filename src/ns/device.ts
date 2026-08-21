import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter.js";
import { Chain, RawChain } from "./chain.js";
import { DrumPad, RawDrumPad } from "./drum-pad.js";

export interface GettableProperties {
  can_have_chains: boolean;
  can_have_drum_pads: boolean;
  /** Rack devices only. Empty array for other devices. */
  chains: RawChain[];
  class_display_name: string;
  class_name: string;
  /** Drum Racks only. Empty array for other devices. */
  drum_pads: RawDrumPad[];
  is_active: boolean;
  name: string;
  parameters: RawDeviceParameter[];
  /** Rack devices only. Empty array for other devices. */
  return_chains: RawChain[];
  type: DeviceType;
}

export interface TransformedProperties {
  chains: Chain[];
  drum_pads: DrumPad[];
  parameters: DeviceParameter[];
  return_chains: Chain[];
}

export interface SettableProperties {
  name: string;
}

export interface ObservableProperties {
  is_active: boolean;
  name: string;
  parameters: string;
}

export interface RawDevice {
  readonly id: string;
  readonly name: string;
  readonly type: DeviceType;
  readonly class_name: string;
}

export enum DeviceType {
  AudioEffect = "audio_effect",
  Instrument = "instrument",
  MidiEffect = "midi_effect",
  Undefined = "undefined",
}

export class Device extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public raw: RawDevice,
  ) {
    super(ableton, "device", raw.id);

    this.transformers = {
      chains: (chains) => chains.map((c) => new Chain(ableton, c)),
      drum_pads: (pads) => pads.map((p) => new DrumPad(ableton, p)),
      parameters: (ps) => ps.map((p) => new DeviceParameter(ableton, p)),
      return_chains: (chains) => chains.map((c) => new Chain(ableton, c)),
    };

    this.cachedProps = {
      chains: true,
      drum_pads: true,
      parameters: true,
      return_chains: true,
    };
  }
}
