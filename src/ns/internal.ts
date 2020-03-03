import { Ableton } from "..";
import { Namespace } from ".";
import semver from "semver";
import packageInfo from "../../package.json";

export interface GettableProperties {
  version: string;
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
    return !semver.lt(pluginVersion, packageInfo.version);
  }
}
