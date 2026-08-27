import { describe, it } from "vitest";
import { gettablePropKeys, createAbleton } from "../util/tests.js";
import { GettableProperties } from "./browser.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  audio_effects: true,
  clips: true,
  colors: true,
  current_project: true,
  drums: true,
  filter_type: true,
  hotswap_target: true,
  instruments: true,
  legacy_libraries: true,
  max_for_live: true,
  midi_effects: true,
  packs: true,
  plugins: true,
  samples: true,
  sounds: true,
  user_folders: true,
  user_library: true,
});

describe("Browser", () => {
  it("should be able to read all properties without erroring", async () => {
    await using ab = await createAbleton();

    await Promise.all(gettableProps.map((p) => ab.application.browser.get(p)));
  });
});
