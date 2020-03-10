import fs from "fs";
import path from "path";

export const getPackageVersion = () => {
  const parentPath = path.join(__dirname, "..", "package.json");
  const parent2Path = path.join(__dirname, "..", "..", "package.json");

  if (fs.existsSync(parentPath)) {
    return require(parentPath).version;
  }

  if (fs.existsSync(parent2Path)) {
    return require(parent2Path).version;
  }

  throw new Error("Could not find package.json");
};
