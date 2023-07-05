import { describe, it } from "vitest";
import { withAbleton } from "../util/tests";
import { GettableProperties } from "./song-view";

const gettableProps: (keyof GettableProperties)[] = [
  "detail_clip",
  "draw_mode",
  "follow_song",
  "highlighted_clip_slot",
  "selected_chain",
  "selected_parameter",
  "selected_scene",
  "selected_track",
];

describe("Song View", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      await Promise.all(gettableProps.map((p) => ab.song.view.get(p)));
    });
  });
});
