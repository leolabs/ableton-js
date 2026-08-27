import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Chain } from "./chain.js";
import { AnyChain, wrapChain } from "./drum-chain.js";
import {
  AnyDevice,
  GettableProperties as DeviceGettableProperties,
  ObservableProperties as DeviceObservableProperties,
  RawDevice,
  SettableProperties as DeviceSettableProperties,
  TransformedProperties as DeviceTransformedProperties,
} from "./device.js";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter.js";
import { DrumPad } from "./drum-pad.js";
import { RackDeviceView } from "./rack-device-view.js";

/**
 * Live `class_name` values for Instrument / Drum / Audio Effect / MIDI Effect Rack
 * racks (`Live.RackDevice.RackDevice`).
 */
export const RACK_CLASS_NAMES = [
  "InstrumentGroupDevice",
  "DrumGroupDevice",
  "AudioEffectGroupDevice",
  "MidiEffectGroupDevice",
] as const;

export type RackClassName = (typeof RACK_CLASS_NAMES)[number];

export interface GettableProperties extends DeviceGettableProperties {
  /** True if this rack can show its chains in Session View. */
  can_show_chains: boolean;
  /** Chain selector parameter; `null` on drum racks (they have none). */
  chain_selector: RawDeviceParameter | null;
  /** True if this is a drum rack that has drum pads; `false` on other racks. */
  has_drum_pads: boolean;
  /** True if any of the rack's macros are mapped to a parameter. */
  has_macro_mappings: boolean;
  /** Whether the rack is currently showing its chains. */
  is_showing_chains: boolean;
  /** Per-macro flags: true iff that macro is mapped. */
  macros_mapped: boolean[];
  /** Index of the currently selected macro variation. */
  selected_variation_index: number;
  /** Number of macro variations currently stored. */
  variation_count: number;
  /** Visible drum pads; empty on non-drum racks. */
  visible_drum_pads: DeviceGettableProperties["drum_pads"];
  /** Number of macros that are currently visible. */
  visible_macro_count: number;
}

export interface TransformedProperties extends DeviceTransformedProperties {
  chain_selector: DeviceParameter | null;
  chains: AnyChain[];
  return_chains: Chain[];
  visible_drum_pads: DrumPad[];
}

export interface SettableProperties extends DeviceSettableProperties {
  is_showing_chains: boolean;
  selected_variation_index: number;
}

export interface ObservableProperties extends DeviceObservableProperties {
  chains: DeviceGettableProperties["chains"];
  drum_pads: DeviceGettableProperties["drum_pads"];
  has_drum_pads: boolean;
  has_macro_mappings: boolean;
  is_showing_chains: boolean;
  macros_mapped: boolean[];
  return_chains: DeviceGettableProperties["return_chains"];
  variation_count: number;
  visible_drum_pads: DeviceGettableProperties["drum_pads"];
  visible_macro_count: number;
}

/**
 * This class represents a Rack device (Instrument, Drum, Audio Effect, or MIDI
 * Effect Rack).
 */
export class RackDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  public readonly view: RackDeviceView;

  constructor(
    ableton: Ableton,
    public readonly raw: RawDevice,
  ) {
    super(ableton, "rack-device", raw.id);
    this.view = new RackDeviceView(ableton, raw.id);

    this.transformers = {
      chain_selector: (p) => (p ? new DeviceParameter(ableton, p) : null),
      chains: (chains) => chains.map((c) => wrapChain(ableton, c)),
      drum_pads: (pads) => pads.map((p) => new DrumPad(ableton, p)),
      parameters: (ps) => ps.map((p) => new DeviceParameter(ableton, p)),
      return_chains: (chains) => chains.map((c) => new Chain(ableton, c)),
      visible_drum_pads: (pads) => pads.map((p) => new DrumPad(ableton, p)),
    };

    this.cachedProps = {
      chain_selector: true,
      chains: true,
      drum_pads: true,
      parameters: true,
      return_chains: true,
      visible_drum_pads: true,
    };
  }

  /** Increases the number of visible macro controls in the rack. */
  addMacro() {
    return this.sendCommand("add_macro");
  }

  /**
   * Copies all contents of a drum pad from a source pad into a destination pad.
   * Indices are note numbers (0–127). Throws if the source pad is empty or
   * indices are out of range.
   */
  copyPad(sourceIndex: number, destinationIndex: number) {
    return this.sendCommand("copy_pad", {
      source_index: sourceIndex,
      destination_index: destinationIndex,
    });
  }

  /** Deletes the currently selected macro variation. */
  deleteSelectedVariation() {
    return this.sendCommand("delete_selected_variation");
  }

  /**
   * Inserts a new chain at `index`, or at the end when `index` is `-1`
   * (default).
   */
  async insertChain(index = -1) {
    const result = await this.sendCommand("insert_chain", { index });
    return wrapChain(this.ableton, result);
  }

  /** Randomizes values for all macro controls not excluded from randomization. */
  randomizeMacros() {
    return this.sendCommand("randomize_macros");
  }

  /** Recalls the macro variation that was recalled most recently. */
  recallLastUsedVariation() {
    return this.sendCommand("recall_last_used_variation");
  }

  /** Recalls the currently selected macro variation. */
  recallSelectedVariation() {
    return this.sendCommand("recall_selected_variation");
  }

  /** Decreases the number of visible macro controls in the rack. */
  removeMacro() {
    return this.sendCommand("remove_macro");
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

  /** Stores a new variation of the values of all currently mapped macros. */
  storeVariation() {
    return this.sendCommand("store_variation");
  }
}

export function isRackDevice(device: AnyDevice): device is RackDevice {
  return device instanceof RackDevice;
}

export function isRackClassName(className: string): className is RackClassName {
  return (RACK_CLASS_NAMES as readonly string[]).includes(className);
}
