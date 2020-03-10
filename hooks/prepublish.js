const fs = require("fs");
const path = require("path");
const package = require("../package.json");

const internalPath = path.join(__dirname, "..", "midi-script", "Internal.py");
const file = fs.readFileSync(internalPath);

const replaced = file
  .toString()
  .replace(/return "(.+\..+\..+?)"$/m, `return "${package.version}"`);

fs.writeFileSync(internalPath, replaced);
