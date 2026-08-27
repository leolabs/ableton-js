import { describe, it } from "vitest";
import { gettablePropKeys, createAbleton, createTrack } from "../util/tests.js";
import { GettableProperties } from "./mixer-device.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  crossfade_assign: true,
  crossfader: true,
  cue_volume: true,
  left_split_stereo: true,
  panning: true,
  panning_mode: true,
  right_split_stereo: true,
  sends: true,
  song_tempo: true,
  track_activator: true,
  volume: true,
});

const mainTrackOnly = ["crossfader", "cue_volume", "song_tempo"] as Array<
  keyof GettableProperties
>;

describe("Mixer Device", () => {
  it("should be able to read all properties without erroring", async () => {
    await using ab = await createAbleton();

    const masterTrack = await ab.song.get("master_track");
    const masterMixer = await masterTrack.get("mixer_device");

    await Promise.all(
      gettableProps
        // crossfade_assign is not applicable to the main track
        .filter((p) => p !== "crossfade_assign")
        .map((p) => masterMixer.get(p)),
    );

    await using track = await createTrack(ab, "audio");

    const audioMixer = await track.get("mixer_device");

    await Promise.all(
      gettableProps
        .filter((p) => !mainTrackOnly.includes(p))
        .map((p) => audioMixer.get(p)),
    );
  });
});
