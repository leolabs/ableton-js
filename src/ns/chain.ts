import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Device, RawDevice } from "./device.js";
import { MixerDevice, RawMixerDevice } from "./mixer-device.js";

export interface GettableProperties {
  color: number | null;
  devices: RawDevice[];
  mixer_device: RawMixerDevice;
  mute: boolean;
  name: string;
  solo: boolean;
}

export interface TransformedProperties {
  devices: Device[];
  mixer_device: MixerDevice;
}

export interface SettableProperties {
  mute: boolean;
  solo: boolean;
}

export interface ObservableProperties {
  mute: boolean;
  name: string;
  solo: boolean;
}

export interface RawChain {
  readonly id: string;
  readonly name: string;
  readonly color: number | null;
  readonly mute: boolean;
  readonly solo: boolean;
}

/**
 * Represents a device chain inside a rack device (Instrument/Audio Effect/MIDI
 * Effect Rack), or the chain owned by a single Drum Rack pad. Not every device
 * has chains - check `Device.can_have_chains`/`can_have_drum_pads` first.
 */
export class Chain extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public raw: RawChain,
  ) {
    super(ableton, "chain", raw.id);

    this.transformers = {
      devices: (devices) => devices.map((d) => new Device(ableton, d)),
      mixer_device: (m) => new MixerDevice(ableton, m),
    };

    this.cachedProps = {
      devices: true,
      mixer_device: true,
    };
  }
}
