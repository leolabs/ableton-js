import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { getPackageVersion } from "../util/package-version.js";
import semver from "semver";

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

  async isPluginUpToDate() {
    const pluginVersion = await this.get("version");
    return !semver.lt(pluginVersion, getPackageVersion());
  }
}
