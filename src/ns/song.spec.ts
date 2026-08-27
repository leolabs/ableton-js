import { describe, it, expect } from "vitest";
import { gettablePropKeys, withAbleton } from "../util/tests.js";
import { GettableProperties } from "./song.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  appointed_device: true,
  arrangement_overdub: true,
  back_to_arranger: true,
  can_capture_midi: true,
  can_jump_to_next_cue: true,
  can_jump_to_prev_cue: true,
  can_redo: true,
  can_undo: true,
  clip_trigger_quantization: true,
  count_in_duration: true,
  cue_points: true,
  current_song_time: true,
  exclusive_arm: true,
  exclusive_solo: true,
  file_path: true,
  groove_amount: true,
  is_ableton_link_enabled: true,
  is_ableton_link_start_stop_sync_enabled: true,
  is_counting_in: true,
  is_playing: true,
  last_event_time: true,
  loop: true,
  loop_length: true,
  loop_start: true,
  master_track: true,
  metronome: true,
  midi_recording_quantization: true,
  name: true,
  nudge_down: true,
  nudge_up: true,
  overdub: true,
  punch_in: true,
  punch_out: true,
  re_enable_automation_enabled: true,
  record_mode: true,
  return_tracks: true,
  root_note: true,
  scale_intervals: true,
  scale_mode: true,
  scale_name: true,
  scenes: true,
  select_on_launch: true,
  session_automation_record: true,
  session_record: true,
  session_record_status: true,
  signature_denominator: true,
  signature_numerator: true,
  song_length: true,
  start_time: true,
  swing_amount: true,
  tempo: true,
  tempo_follower_enabled: true,
  tracks: true,
  tuning_system: true,
  visible_tracks: true,
});

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

  it("should be able to change the playback quantization", async () => {
    await withAbleton(async (ab) => {
      const currentQuantization = await ab.song.get(
        "clip_trigger_quantization",
      );
      await ab.song.set("clip_trigger_quantization", "q_eight");
      await ab.song.set("clip_trigger_quantization", currentQuantization);
    });
  });

  it("should be able to change the recording quantization", async () => {
    await withAbleton(async (ab) => {
      const currentQuantization = await ab.song.get(
        "midi_recording_quantization",
      );
      await ab.song.set("midi_recording_quantization", "rec_q_quarter");
      await ab.song.set("midi_recording_quantization", currentQuantization);
    });
  });

  it("should be able to write and read large objects from the project", async () => {
    await withAbleton(async (ab) => {
      const largeArray: number[] = [];

      for (let i = 0; i < 1000000; i++) {
        largeArray.push(i);
      }

      await ab.song.setData("abletonjs_test", largeArray);
      const received = await ab.song.getData("abletonjs_test");
      expect(received).toEqual(largeArray);
    });
  });

  it("should list available, observable properties and functions via introspection", async () => {
    await withAbleton(async (ab) => {
      const available = await ab.song.getAvailableProperties();
      expect(available).toContain("tempo");

      const observable = await ab.song.getObservableProperties();
      expect(observable).toContain("is_playing");
      expect(observable).toContain("tempo");

      const functions = await ab.song.getAvailableFunctions();
      expect(functions).toContain("start_playing");
      expect(functions).not.toContain("add_tempo_listener");
      expect(functions).not.toContain("View");
    });
  });
});
