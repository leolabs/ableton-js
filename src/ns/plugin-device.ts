import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Chain } from "./chain.js";
import {
  AnyDevice,
  GettableProperties as DeviceGettableProperties,
  ObservableProperties as DeviceObservableProperties,
  RawDevice,
  SettableProperties as DeviceSettableProperties,
  TransformedProperties as DeviceTransformedProperties,
} from "./device.js";
import { DeviceParameter } from "./device-parameter.js";
import { DeviceView } from "./device-view.js";
import { DrumPad } from "./drum-pad.js";

/** Live's `class_name` for VST/AU/VST3 plugin devices. */
export const PLUGIN_CLASS_NAME = "PluginDevice";

export interface GettableProperties extends DeviceGettableProperties {
  /** Whether the plugin's editor window is open. */
  is_editor_open: boolean;
  /** Presets the plugin offers. */
  presets: string[];
  /** Index of the currently selected preset. */
  selected_preset_index: number;
}

export interface TransformedProperties extends DeviceTransformedProperties {}

export interface SettableProperties extends DeviceSettableProperties {
  is_editor_open: boolean;
  selected_preset_index: number;
}

export interface ObservableProperties extends DeviceObservableProperties {
  is_editor_open: boolean;
  presets: string[];
  selected_preset_index: number;
}

/**
 * This class represents a plugin device.
 */
export class PluginDevice extends Namespace<
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
    super(ableton, "plugin-device", raw.id);
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
   * Get the range of plugin parameter names, bound by begin and end.
   * If end is smaller than 0 it is interpreted as the parameter count.
   */
  getParameterNames(begin = 0, end = -1): Promise<string[]> {
    return this.sendCommand("get_parameter_names", { begin, end });
  }

  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }

  /** Set the selected bank in the device for persistency. */
  storeChosenBank(argument: number, bank: number) {
    return this.sendCommand("store_chosen_bank", [argument, bank]);
  }
}

export function isPluginDevice(device: AnyDevice): device is PluginDevice {
  return device instanceof PluginDevice;
}
