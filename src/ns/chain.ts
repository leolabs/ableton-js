import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { AnyDevice, RawDevice, wrapDevice } from "./device.js";
import {
  ChainMixerDevice,
  RawChainMixerDevice,
} from "./chain-mixer-device.js";

export interface GettableProperties {
  color: number | null;
  color_index: number;
  devices: RawDevice[];
  has_audio_input: boolean;
  has_audio_output: boolean;
  has_midi_input: boolean;
  has_midi_output: boolean;
  is_auto_colored: boolean;
  mixer_device: RawChainMixerDevice;
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  solo: boolean;
}

export interface TransformedProperties {
  devices: AnyDevice[];
  mixer_device: ChainMixerDevice;
}

export interface SettableProperties {
  color: number;
  color_index: number;
  is_auto_colored: boolean;
  mute: boolean;
  name: string;
  solo: boolean;
}

export interface ObservableProperties {
  color: number;
  color_index: number;
  devices: RawDevice[];
  is_auto_colored: boolean;
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  solo: boolean;
}

export interface RawChain {
  readonly id: string;
  readonly name: string;
  readonly color: number | null;
  readonly mute: boolean;
  readonly solo: boolean;
  readonly is_drum_chain?: boolean;
  readonly choke_group?: number;
  readonly in_note?: number;
  readonly out_note?: number;
}

/**
 * Represents a device chain inside a rack device (Instrument/Audio Effect/MIDI
 * Effect Rack). Not every device has chains — check
 * `Device.can_have_chains`/`can_have_drum_pads` first.
 *
 * Drum Rack chains are wrapped as {@link DrumChain} via {@link wrapChain}.
 */
export class Chain extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawChain,
  ) {
    super(ableton, "chain", raw.id);

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
   * Delete a device identified by its index in this chain's `devices` list.
   */
  deleteDevice(index: number) {
    return this.sendCommand("delete_device", { index });
  }

  /** Duplicate the device at `index` in this chain. */
  duplicateDevice(index: number) {
    return this.sendCommand("duplicate_device", { index });
  }

  /**
   * Insert a native Live device by UI name at `deviceIndex` (-1 = end).
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
