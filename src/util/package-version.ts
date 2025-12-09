import packageJson from "../../package.json" with { type: "json" };

export const getPackageVersion = () => {
  return packageJson.version;
};
