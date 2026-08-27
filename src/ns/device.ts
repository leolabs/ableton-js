import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter.js";
import { Chain, RawChain } from "./chain.js";
import { DrumPad, RawDrumPad } from "./drum-pad.js";
import { DeviceView } from "./device-view.js";
import { LOOPER_CLASS_NAME, LooperDevice } from "./looper-device.js";
import { PLUGIN_CLASS_NAME, PluginDevice } from "./plugin-device.js";
import { isRackClassName, RackDevice } from "./rack-device.js";

export interface GettableProperties {
  can_have_chains: boolean;
  can_have_drum_pads: boolean;
  can_compare_ab: boolean;
  /** Rack devices only. Empty array for other devices. */
  chains: RawChain[];
  class_display_name: string;
  class_name: string;
  /** Drum Racks only. Empty array for other devices. */
  drum_pads: RawDrumPad[];
  is_active: boolean;
  is_using_compare_preset_b: boolean;
  latency_in_ms: number;
  latency_in_samples: number;
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
  is_using_compare_preset_b: boolean;
  latency_in_ms: number;
  latency_in_samples: number;
  name: string;
  parameters: string;
}

export interface RawDevice {
  readonly id: string;
  readonly name: string;
  readonly type: DeviceType;
  readonly class_name: string;
}

export type DeviceType =
  | "audio_effect"
  | "instrument"
  | "midi_effect"
  | "undefined";

export type AnyDevice = Device | LooperDevice | PluginDevice | RackDevice;

/**
 * Wraps a serialized device as a subclass when Live's `class_name` matches,
 * otherwise as a {@link Device}.
 */
export function wrapDevice(ableton: Ableton, raw: RawDevice): AnyDevice {
  if (raw.class_name === LOOPER_CLASS_NAME) {
    return new LooperDevice(ableton, raw);
  }
  if (raw.class_name === PLUGIN_CLASS_NAME) {
    return new PluginDevice(ableton, raw);
  }
  if (isRackClassName(raw.class_name)) {
    return new RackDevice(ableton, raw);
  }
  return new Device(ableton, raw);
}

export class Device extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  public readonly view: DeviceView;

  constructor(
    ableton: Ableton,
    public readonly raw: RawDevice,
  ) {
    super(ableton, "device", raw.id);
    this.view = new DeviceView(ableton, raw.id);

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

  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }

  /** Sets the selected bank in the device for persistency. */
  storeChosenBank(argument: number, bank: number) {
    return this.sendCommand("store_chosen_bank", [argument, bank]);
  }
}
