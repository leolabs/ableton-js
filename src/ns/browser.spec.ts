import { describe, it } from "vitest";
import { withAbleton } from "../util/tests";
import { GettableProperties } from "./browser";

const gettableProps: (keyof GettableProperties)[] = [
  "audio_effects",
  "clips",
  "colors",
  "current_project",
  "drums",
  "instruments",
  "max_for_live",
  "midi_effects",
  "packs",
  "plugins",
  "samples",
  "sounds",
  "user_folders",
  "user_library",
  "hotswap_target",
];

describe("Application", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      await Promise.all(
        gettableProps.map((p) => ab.application.browser.get(p)),
      );
    });
  });
});
