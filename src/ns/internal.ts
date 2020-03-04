import { Ableton } from "..";
import { Namespace } from ".";
import semver from "semver";
import fs from "fs";
import path from "path";

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

  getPackageVersion() {
    const parentPath = path.join(__dirname, "..", "package.json");
    const parent2Path = path.join(__dirname, "..", "..", "package.json");

    if (fs.existsSync(parentPath)) {
      return require(parentPath).version;
    }

    if (fs.existsSync(parent2Path)) {
      return require(parent2Path).version;
    }

    throw new Error("Could not find package.json");
  }

  async isPluginUpToDate() {
    const pluginVersion = await this.get("version");
    return !semver.lt(pluginVersion, this.getPackageVersion());
  }
}
