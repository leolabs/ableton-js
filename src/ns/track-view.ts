import type { Ableton } from "../index.js";
import { type AnyDevice, type RawDevice, wrapDevice } from "./device.js";
import { Namespace } from "./index.js";

export type DeviceInsertMode = "default" | "selected_left" | "selected_right";

export interface GettableProperties {
  // device_insert_mode: DeviceInsertMode; – for some reason, Live returns a boolean here
  is_collapsed: boolean;
  selected_device: RawDevice | null;
}

export interface TransformedProperties {
  selected_device: AnyDevice | null;
}

export interface SettableProperties {
  device_insert_mode: DeviceInsertMode;
  is_collapsed: boolean;
}

export interface ObservableProperties {
  // device_insert_mode: DeviceInsertMode;
  is_collapsed: boolean;
  selected_device: RawDevice | null;
}

export class TrackView extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, nsid: string) {
    super(ableton, "track-view", nsid);

    this.transformers = {
      selected_device: (device) =>
        device ? wrapDevice(ableton, device) : null,
    };

    this.cachedProps = {
      selected_device: true,
    };
  }

  /**
   * Selects the track's instrument if it has one.
   */
  public async selectInstrument() {
    return this.sendCommand("select_instrument");
  }
}
