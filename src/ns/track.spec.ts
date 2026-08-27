import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { createAbleton, createTrack, gettablePropKeys } from "../util/tests.js";
import { Color } from "../util/color.js";
import { Clip } from "./clip.js";
import { ClipSlot } from "./clip-slot.js";
import { Device } from "./device.js";
import { MixerDevice } from "./mixer-device.js";
import { TakeLane } from "./take-lane.js";
import { GettableProperties } from "./track.js";

const samplePath = resolve(
  import.meta.dirname,
  "../../test-fixtures/silence.wav",
);

const gettableProps = gettablePropKeys<GettableProperties>({
  arm: true,
  arrangement_clips: true,
  available_input_routing_channels: true,
  available_input_routing_types: true,
  available_output_routing_channels: true,
  available_output_routing_types: true,
  back_to_arranger: true,
  can_be_armed: true,
  can_be_frozen: true,
  can_show_chains: true,
  clip_slots: true,
  color: true,
  color_index: true,
  current_input_routing: true,
  current_input_sub_routing: true,
  current_monitoring_state: true,
  current_output_routing: true,
  current_output_sub_routing: true,
  devices: true,
  fired_slot_index: true,
  fold_state: true,
  group_track: true,
  has_audio_input: true,
  has_audio_output: true,
  has_midi_input: true,
  has_midi_output: true,
  implicit_arm: true,
  input_meter_left: true,
  input_meter_level: true,
  input_meter_right: true,
  input_routing_channel: true,
  input_routing_type: true,
  input_routings: true,
  input_sub_routings: true,
  is_foldable: true,
  is_frozen: true,
  is_grouped: true,
  is_part_of_selection: true,
  is_showing_chains: true,
  is_visible: true,
  mixer_device: true,
  mute: true,
  muted_via_solo: true,
  name: true,
  output_meter_left: true,
  output_meter_level: true,
  output_meter_right: true,
  output_routing_channel: true,
  output_routing_type: true,
  output_routings: true,
  output_sub_routings: true,
  performance_impact: true,
  playing_slot_index: true,
  solo: true,
  take_lanes: true,
});

/** `fold_state` is only valid on group/foldable tracks. */
const nonGroupProps = gettableProps.filter((p) => p !== "fold_state");

/** Props unavailable on MIDI tracks (meters + group-only fold). */
const midiOnlyOmit = [
  "fold_state",
  "input_meter_left",
  "input_meter_level",
  "input_meter_right",
  "output_meter_left",
  "output_meter_level",
  "output_meter_right",
] as const satisfies readonly (keyof GettableProperties)[];

const midiGettableProps = gettableProps.filter(
  (p) => !(midiOnlyOmit as readonly string[]).includes(p),
);

describe("Track", () => {
  it("should be able to read all properties without erroring", async () => {
    await using ab = await createAbleton();

    await using midi = await createTrack(ab, "midi");
    await Promise.all(midiGettableProps.map((p) => midi.get(p)));

    await using audio = await createTrack(ab, "audio");
    await Promise.all(nonGroupProps.map((p) => audio.get(p)));
  });

  it("should transform nested properties to the expected types", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "midi");

    const color = await track.get("color");
    expect(color).toBeInstanceOf(Color);

    const devices = await track.get("devices");
    expect(devices).toEqual(expect.any(Array));

    const clipSlots = await track.get("clip_slots");
    expect(clipSlots.length).toBeGreaterThan(0);
    expect(clipSlots[0]).toBeInstanceOf(ClipSlot);

    const arrangementClips = await track.get("arrangement_clips");
    expect(arrangementClips).toEqual([]);

    const groupTrack = await track.get("group_track");
    expect(groupTrack).toBeNull();

    const mixerDevice = await track.get("mixer_device");
    expect(mixerDevice).toBeInstanceOf(MixerDevice);

    const takeLanes = await track.get("take_lanes");
    expect(takeLanes).toEqual([]);

    expect(track.view).toBeDefined();
  });

  it("creates and deletes a MIDI arrangement clip", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "midi");

    const clip = await track.createMidiClip(0, 4);
    expect(clip).toBeInstanceOf(Clip);
    expect(clip.raw.is_midi_clip).toBe(true);
    expect(clip.raw.is_audio_clip).toBe(false);
    expect(await clip.get("name")).toBeTypeOf("string");

    await track.deleteClip(clip);
    expect(await track.get("arrangement_clips")).toEqual([]);
  });

  it("creates an audio arrangement clip from a sample file", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "audio");

    const clip = await track.createAudioClip(samplePath, 0);
    expect(clip).toBeInstanceOf(Clip);
    expect(clip.raw.is_audio_clip).toBe(true);
    expect(clip.raw.is_midi_clip).toBe(false);

    await track.deleteClip(clip);
    expect(await track.get("arrangement_clips")).toEqual([]);
  });

  it("duplicates a MIDI clip into the arrangement", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "midi");

    const original = await track.createMidiClip(0, 4);
    const duplicate = await track.duplicateClipToArrangement(original, 8);
    expect(duplicate).toBeInstanceOf(Clip);
    expect(duplicate.raw.id).not.toBe(original.raw.id);

    const clips = await track.get("arrangement_clips");
    expect(clips).toHaveLength(2);
  });

  it("inserts, duplicates, and deletes devices", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "midi");

    const device = await track.insertDevice("Chord");
    expect(device).toBeInstanceOf(Device);
    expect(await track.get("devices")).toHaveLength(1);

    await track.duplicateDevice(0);
    expect(await track.get("devices")).toHaveLength(2);

    await track.deleteDevice(0);
    expect(await track.get("devices")).toHaveLength(1);

    await track.deleteDevice(0);
    expect(await track.get("devices")).toHaveLength(0);
  });

  it("creates a take lane", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "midi");

    const lane = await track.createTakeLane();
    expect(lane).toBeInstanceOf(TakeLane);

    const lanes = await track.get("take_lanes");
    expect(lanes.length).toBeGreaterThanOrEqual(1);
    expect(lanes.some((l) => l.raw.id === lane.raw.id)).toBe(true);
  });

  it("duplicates a clip slot", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "midi");

    const slots = await track.get("clip_slots");
    expect(slots.length).toBeGreaterThan(0);

    await slots[0]!.createClip(4);
    const destinationIndex = await track.duplicateClipSlot(0);
    expect(destinationIndex).toBeTypeOf("number");
    expect(destinationIndex).toBeGreaterThanOrEqual(1);

    const updatedSlots = await track.get("clip_slots");
    expect(await updatedSlots[destinationIndex]!.get("has_clip")).toBe(true);
  });

  it("stops all clips and jumps in a running session clip without erroring", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "midi");

    await track.stopAllClips();
    await track.stopAllClips(false);
    await track.jumpInRunningSessionClip(1);
  });

  it("reads and writes track data", async () => {
    await using ab = await createAbleton();
    await using track = await createTrack(ab, "midi");

    const key = "abletonjs_track_test";
    const value = { n: 42, s: "track" };
    await track.setData(key, value);
    expect(await track.getData(key)).toEqual(value);
  });

  it("exposes MIDI vs audio input/output flags", async () => {
    await using ab = await createAbleton();

    await using midi = await createTrack(ab, "midi");
    expect(await midi.get("has_midi_input")).toBe(true);
    expect(await midi.get("has_audio_input")).toBe(false);

    await using audio = await createTrack(ab, "audio");
    expect(await audio.get("has_audio_input")).toBe(true);
    expect(await audio.get("has_midi_input")).toBe(false);
  });

  it("sets raw.type for audio, midi, return, and main tracks", async () => {
    await using ab = await createAbleton();

    await using midi = await createTrack(ab, "midi");
    expect(midi.raw.type).toBe("midi");

    await using audio = await createTrack(ab, "audio");
    expect(audio.raw.type).toBe("audio");

    const master = await ab.song.get("master_track");
    expect(master.raw.type).toBe("main");

    const returns = await ab.song.get("return_tracks");
    for (const track of returns) {
      expect(track.raw.type).toBe("return");
    }
  });
});
