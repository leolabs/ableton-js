import { Ableton } from "../index.js";
import { Namespace } from "./index.js";

export interface GettableProperties {
  is_collapsed: boolean;
}

export interface TransformedProperties {}

export interface SettableProperties {
  is_collapsed: boolean;
}

export interface ObservableProperties {
  is_collapsed: boolean;
}

/**
 * View aspects of a device.
 */
export class DeviceView extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, nsid: string) {
    super(ableton, "device-view", nsid);
  }
}
