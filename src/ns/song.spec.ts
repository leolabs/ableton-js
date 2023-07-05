import { describe, it, expect } from "vitest";
import { withAbleton } from "../util/tests";
import { GettableProperties } from "./song";

const gettableProps: (keyof GettableProperties)[] = [
  "arrangement_overdub",
  "back_to_arranger",
  "can_capture_midi",
  "can_jump_to_next_cue",
  "can_jump_to_prev_cue",
  "can_redo",
  "can_undo",
  "clip_trigger_quantization",
  "count_in_duration",
  "cue_points",
  "current_song_time",
  "exclusive_arm",
  "exclusive_solo",
  "groove_amount",
  "is_counting_in",
  "is_playing",
  "last_event_time",
  "loop",
  "loop_length",
  "loop_start",
  "master_track",
  "metronome",
  "midi_recording_quantization",
  "nudge_down",
  "nudge_up",
  "overdub",
  "punch_in",
  "punch_out",
  "re_enable_automation_enabled",
  "record_mode",
  "return_tracks",
  "root_note",
  "scale_name",
  "scenes",
  "select_on_launch",
  "session_automation_record",
  "session_record",
  "session_record_status",
  "signature_denominator",
  "signature_numerator",
  "song_length",
  "swing_amount",
  "tempo",
  "tracks",
  "visible_tracks",
];

describe("Song", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      await Promise.all(gettableProps.map((p) => ab.song.get(p)));
    });
  });

  it("should return the proper types for properties", async () => {
    await withAbleton(async (ab) => {
      const songTime = await ab.song.get("current_song_time");
      expect(songTime).toBeTypeOf("number");

      const clipTriggerQuantization = await ab.song.get(
        "clip_trigger_quantization",
      );
      expect(clipTriggerQuantization).toBeTypeOf("string");

      const isPlaying = await ab.song.get("is_playing");
      expect(isPlaying).toBeTypeOf("boolean");
    });
  });

  it("should be able to write and read large objects from the project", async () => {
    await withAbleton(async (ab) => {
      const largeArray: number[] = [];

      for (let i = 0; i < 100000; i++) {
        largeArray.push(i);
      }

      await ab.song.setData("abletonjs_test", largeArray);
      const received = await ab.song.getData("abletonjs_test");
      expect(received).toEqual(largeArray);
    });
  });
});
