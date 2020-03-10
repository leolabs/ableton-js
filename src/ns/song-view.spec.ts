import { Ableton } from "../index";
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
    const a = new Ableton();
    await Promise.all(gettableProps.map(p => a.song.view.get(p)));
    a.close();
  });
});
