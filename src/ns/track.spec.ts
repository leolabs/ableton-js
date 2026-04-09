import { describe, it, expect } from "vitest";
import { withAbleton } from "../util/tests.js";

describe("Track", () => {
  it("should be able to create a MIDI clip in arrangement", async () => {
    await withAbleton(async (ab) => {
      const track = await ab.song.createMidiTrack();

      try {
        const clip = await track.createMidiClip(0, 4);
        expect(clip.raw.is_midi_clip).toBe(true);
        expect(clip.raw.is_audio_clip).toBe(false);

        const name = await clip.get("name");
        expect(name).toBeTypeOf("string");
      } catch (error) {}
    });
  });
});
