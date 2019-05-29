import { Ableton } from "../index";
import { GettableProperties } from "./song-view";

const a = new Ableton();

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

describe("Song", () => {
  it("should be able to read all properties without erroring", async () => {
    console.log(await Promise.all(gettableProps.map(p => a.song.view.get(p))));
  });
});

afterAll(() => a.close());
