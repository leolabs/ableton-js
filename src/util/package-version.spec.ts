import { describe, it, expect } from "vitest";
import { getPackageVersion } from "./package-version";
import { valid } from "semver";

describe("Package Version", () => {
  it("should get a valid package version without erroring", () => {
    const version = getPackageVersion();
    expect(valid(version)).toBeTruthy();
  });
});
