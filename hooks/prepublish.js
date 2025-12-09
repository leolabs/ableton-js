import fs from "node:fs";
import path from "node:path";

import packageJson from "../package.json" with { type: "json" };

const internalPath = path.join(import.meta.dirname, "..", "midi-script", "version.py");
const file = fs.readFileSync(internalPath);

const replaced = file
  .toString()
  .replace(/version = "(.+\..+\..+?)"$/m, `version = "${packageJson.version}"`);

fs.writeFileSync(internalPath, replaced);
