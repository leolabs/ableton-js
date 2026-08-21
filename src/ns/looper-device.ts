import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { ClipSlot } from "./clip-slot.js";
import { Chain } from "./chain.js";
import {
  GettableProperties as DeviceGettableProperties,
  ObservableProperties as DeviceObservableProperties,
  RawDevice,
  SettableProperties as DeviceSettableProperties,
  TransformedProperties as DeviceTransformedProperties,
  AnyDevice,
} from "./device.js";
import { DeviceParameter } from "./device-parameter.js";
import { DeviceView } from "./device-view.js";
import { DrumPad } from "./drum-pad.js";

/** Live's `class_name` for the built-in Looper audio effect. */
export const LOOPER_CLASS_NAME = "Looper";

export interface GettableProperties extends DeviceGettableProperties {
  /** The length of Looper's buffer. */
  loop_length: number;
  /**
   * If true, Looper will switch to overdub after recording when recording a
   * fixed number of bars. Otherwise, it switches to playback without overdubbing.
   */
  overdub_after_record: boolean;
  /** Access to the Record Length chooser entry index. */
  record_length_index: number;
  /** Read-only list of Record Length chooser entry strings. */
  record_length_list: string[];
  /** The tempo of Looper's buffer. */
  tempo: number;
}

export interface TransformedProperties extends DeviceTransformedProperties {}

export interface SettableProperties extends DeviceSettableProperties {
  overdub_after_record: boolean;
  record_length_index: number;
  tempo: number;
}

export interface ObservableProperties extends DeviceObservableProperties {
  loop_length: number;
  overdub_after_record: boolean;
  record_length_index: number;
  tempo: number;
}

/**
 * This class represents a Looper device.
 */
export class LooperDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  view: DeviceView;

  constructor(
    ableton: Ableton,
    public raw: RawDevice,
  ) {
    super(ableton, "looper-device", raw.id);
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

  /** Erase Looper's recorded content. */
  clear() {
    return this.sendCommand("clear");
  }

  /** Double the length of Looper's buffer. */
  doubleLength() {
    return this.sendCommand("double_length");
  }

  /** Double the speed of Looper's playback. */
  doubleSpeed() {
    return this.sendCommand("double_speed");
  }

  /** Export Looper's content to a Session Clip Slot. */
  exportToClipSlot(slot: ClipSlot) {
    return this.sendCommand("export_to_clip_slot", {
      slot_id: slot.raw.id,
    });
  }

  /** Halve the length of Looper's buffer. */
  halfLength() {
    return this.sendCommand("half_length");
  }

  /** Halve the speed of Looper's playback. */
  halfSpeed() {
    return this.sendCommand("half_speed");
  }

  /** Play back while adding additional layers of incoming audio. */
  overdub() {
    return this.sendCommand("overdub");
  }

  /** Play back without overdubbing. */
  play() {
    return this.sendCommand("play");
  }

  /** Record incoming audio. */
  record() {
    return this.sendCommand("record");
  }

  /**
   * Saves the current state of the device to the compare AB slot.
   * Only relevant if `can_compare_ab`, otherwise throws.
   */
  savePresetToCompareAbSlot() {
    return this.sendCommand("save_preset_to_compare_ab_slot");
  }

  /** Stop Looper's playback. */
  stop() {
    return this.sendCommand("stop");
  }

  /** Set the selected bank in the device for persistency. */
  storeChosenBank(argument: number, bank: number) {
    return this.sendCommand("store_chosen_bank", [argument, bank]);
  }

  /**
   * Erase everything that was recorded since the last time Overdub was enabled.
   * Calling a second time will restore the material erased by the previous undo
   * operation.
   */
  undo() {
    return this.sendCommand("undo");
  }
}

export function isLooperDevice(device: AnyDevice): device is LooperDevice {
  return device instanceof LooperDevice;
}
