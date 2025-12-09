import fs from "node:fs";
import path from "node:path";

import packageJson from "../package.json" with { type: "json" };

const rootPath = path.join(import.meta.dirname, "..");

const internalPath = path.join(rootPath, "midi-script", "version.py");

const file = fs.readFileSync(internalPath);

const replaced = file
  .toString()
  .replace(/version = "(.+\..+\..+?)"$/m, `version = "${packageJson.version}"`);

fs.writeFileSync(internalPath, replaced);
fs.writeFileSync(
  path.join(rootPath, "util", "package-version.js"),
  `export const packageVersion = "${packageJson.version}";`,
);
