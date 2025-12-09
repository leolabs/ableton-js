import { describe, it } from "vitest";
import { withAbleton } from "../util/tests.js";
import { GettableProperties } from "./mixer-device.js";

const gettableProps: (keyof GettableProperties)[] = [
  //"crossfade_assign", (not applicable to the master track)
  "crossfader",
  "cue_volume",
  "left_split_stereo",
  "panning",
  "panning_mode",
  "right_split_stereo",
  "sends",
  "song_tempo",
  "track_activator",
  "volume",
];

describe("Mixer Device", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      const masterTrack = await ab.song.get("master_track");
      const mixerDevice = await masterTrack.get("mixer_device");
      await Promise.all(gettableProps.map((p) => mixerDevice.get(p)));
    });
  });
});
