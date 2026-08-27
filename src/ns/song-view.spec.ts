import { describe, it } from "vitest";
import { gettablePropKeys, createAbleton } from "../util/tests.js";
import { GettableProperties } from "./song-view.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  detail_clip: true,
  draw_mode: true,
  follow_song: true,
  highlighted_clip_slot: true,
  selected_chain: true,
  selected_parameter: true,
  selected_scene: true,
  selected_track: true,
});

describe("Song View", () => {
  it("should be able to read all properties without erroring", async () => {
    await using ab = await createAbleton();

    await Promise.all(gettableProps.map((p) => ab.song.view.get(p)));
  });
});
