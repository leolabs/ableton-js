import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { packageVersion } from "../util/package-version.js";

export interface GettableProperties {
  version: string;
  ping: boolean;
}

export interface TransformedProperties {}

export interface SettableProperties {}

export interface ObservableProperties {}

export class Internal extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "internal");
  }

  /** Returns whether the MIDI Remote Script version satisfies this client. */
  async isPluginUpToDate() {
    const pluginVersion = await this.get("version");
    return pluginVersion === packageVersion;
  }
}
