import { Ableton } from "..";
import { Namespace } from ".";
import { Color } from "../util/color";
import { DeviceParameter } from "./device-parameter";
import { Note, noteToTuple, NoteTuple, tupleToNote } from "../util/note";

export enum WarpMode {
  Beats = 0,
  Tones = 1,
  Texture = 2,
  Repitch = 3,
  Complex = 4,
  ComplexPro = 6,
}

export enum LaunchMode {
  Trigger = 0,
  Gate = 1,
  Toggle = 2,
  Repeat = 3,
}

export enum LaunchQuantization {
  QGlobal = 0,
  QNone = 1,
  Q8Bars = 2,
  Q4Bars = 3,
  Q2Bars = 4,
  QBar = 5,
  QHalf = 6,
  QHalfTriplet = 7,
  QQuarter = 8,
  QQuarterTriplet = 9,
  QEighth = 10,
  QEighthTriplet = 11,
  QSixteenth = 12,
  QSixteenthTriplet = 13,
  QThirtySecond = 14,
}

interface WarpMarker {
  beat_time: number;
  sample_time: number;
}

export interface GettableProperties {
  available_warp_modes: WarpMode[];
  color: number;
  color_index: number;
  end_marker: number;
  end_time: number;
  file_path: string;
  gain: number;
  gain_display_string: string;
  has_envelopes: boolean;
  is_arrangement_clip: boolean;
  is_audio_clip: boolean;
  is_midi_clip: boolean;
  is_overdubbing: boolean;
  is_playing: boolean;
  is_recording: boolean;
  is_triggered: boolean;
  launch_mode: LaunchMode;
  launch_quantization: LaunchQuantization;
  length: number;
  loop_end: number;
  loop_start: number;
  looping: boolean;
  muted: boolean;
  name: string;
  pitch_coarse: number;
  pitch_fine: number;
  playing_position: number;
  position: number;
  ram_mode: boolean;
  sample_length: number;
  selected_notes: NoteTuple[];
  signature_denominator: number;
  signature_numerator: number;
  start_marker: number;
  start_time: number;
  velocity_amount: number;
  //view: unknown;
  warp_mode: WarpMode;
  warp_markers: WarpMarker[]; // Only supported in ableton 11
  warping: boolean;
  will_record_on_start: boolean;
}

export interface TransformedProperties {
  color: Color;
  notes: Note[];
  selected_notes: Note[];
}

export interface SettableProperties {
  name: string;
  color: Color | number;
  color_index: number;
  end_marker: number;
  gain: number;
  is_playing: boolean;
  launch_mode: LaunchMode;
  launch_quantization: LaunchQuantization;
  loop_end: number;
  loop_start: number;
  looping: boolean;
  muted: boolean;
  pitch_coarse: number;
  pitch_fine: number;
  position: number;
  ram_mode: boolean;
  signature_denominator: number;
  signature_numerator: number;
  start_marker: number;
  velocity_amount: number;
  warp_mode: WarpMode;
  warping: boolean;
}

export interface ObservableProperties {
  color_index: number;
  color: number;
  end_marker: number;
  end_time: number;
  file_path: string;
  gain: number;
  has_envelopes: boolean;
  is_overdubbing: boolean;
  is_recording: boolean;
  loop_end: number;
  loop_start: number;
  muted: boolean;
  name: string;
  notes: NoteTuple[];
  pitch_coarse: number;
  pitch_fine: number;
  playing_position: number;
  position: number;
  signature_denominator: number;
  signature_numerator: number;
  start_marker: number;
  warp_markers: unknown;
  warping: boolean;
}

export interface RawClip {
  id: string;
  name: string;
  color: number;
  color_index: number;
  is_audio_clip: boolean;
  is_midi_clip: boolean;
  start_time: number;
  end_time: number;
  muted: boolean;
}

/**
 * This class represents an entry in Live's Session view matrix.
 */
export class Clip extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawClip) {
    super(ableton, "clip", raw.id);

    this.transformers = {
      color: (c) => new Color(c),
      notes: (n) => (n as NoteTuple[]).map(tupleToNote),
      selected_notes: (n) => n.map(tupleToNote),
    };
  }

  /**
   * Available for audio clips only.
   * Converts the given beat time to sample time.
   * Raises an error if the sample is not warped.
   */
  beatToSampleTime(beats: number): Promise<number> {
    return this.sendCommand("beat_to_sample_time", [beats]);
  }

  /**
   * Clears all envelopes for this clip.
   */
  clearAllEnvelopes(): Promise<void> {
    return this.sendCommand("clear_all_envelopes");
  }

  /**
   * Clears the envelope of this clip's given parameter.
   */
  clearEnvelope(parameter: DeviceParameter): Promise<void> {
    return this.sendCommand("clear_envelope", { parameter });
  }

  /**
   * Creates an envelope for a given parameter and returns it.
   * This should only be used if the envelope doesn't exist.
   * Raises an error if the the envelope can't be created.
   */
  private createAutomationEnvelope() {}

  /**
   * Crops the clip. The region that is cropped depends on whether
   * the clip is looped or not. If looped, the region outside of
   * the loop is removed. If not looped, the region outside
   * the start and end markers is removed.
   */
  crop(): Promise<void> {
    return this.sendCommand("crop");
  }

  /**
   * Deselects all notes present in the clip.
   */
  deselectAllNotes(): Promise<void> {
    return this.sendCommand("deselect_all_notes");
  }

  /**
   * Makes the loop twice as long and duplicates notes and envelopes.
   * Duplicates the clip start/end range if the clip is not looped.
   */
  duplicateLoop(): Promise<void> {
    return this.sendCommand("duplicate_loop");
  }

  /**
   * Duplicates the notes in the specified region to the destination_time.
   * Only notes of the specified pitch are duplicated if pitch is not -1.
   * If the transposition_amount is not 0, the notes in the region will be
   * transposed by the transposition_amount of semitones.
   * Raises an error on audio clips.
   */
  duplicateRegion(
    start: number,
    length: number,
    destinationTime: number,
    pitch = -1,
    transpositionAmount = 0,
  ): Promise<void> {
    return this.sendCommand("duplicate_region", [
      start,
      length,
      destinationTime,
      pitch,
      transpositionAmount,
    ]);
  }

  /**
   * Starts playing this clip.
   */
  fire(): Promise<void> {
    return this.sendCommand("fire");
  }

  /**
   * Returns all notes that match the given range.
   */
  async getNotes(
    fromTime: number,
    fromPitch: number,
    timeSpan: number,
    pitchSpan: number,
  ): Promise<Note[]> {
    const notes: NoteTuple[] = await this.sendCommand("get_notes", {
      from_time: fromTime,
      from_pitch: fromPitch,
      time_span: timeSpan,
      pitch_span: pitchSpan,
    });

    return notes.map(tupleToNote);
  }

  /**
   * Jump forward or backward by the specified relative amount in beats.
   * Will do nothing if the clip is not playing.
   */
  movePlayingPos(amount: number): Promise<void> {
    return this.sendCommand("move_playing_pos", [amount]);
  }

  /**
   * Quantizes all notes in a clip or aligns warp markers.
   */
  quantize(grid: number, amount: number): Promise<void> {
    return this.sendCommand("quantize", [grid, amount]);
  }

  /**
   * Quantizes all the notes of a given pitch.
   */
  quantizePitch(pitch: number, grid: number, amount: number): Promise<void> {
    return this.sendCommand("quantize_pitch", [pitch, grid, amount]);
  }

  /**
   * Deletes all notes that start in the given area.
   */
  removeNotes(
    fromTime: number,
    fromPitch: number,
    timeSpan: number,
    pitchSpan: number,
  ) {
    return this.sendCommand("remove_notes", [
      fromTime,
      fromPitch,
      timeSpan,
      pitchSpan,
    ]);
  }

  /**
   * Replaces selected notes with an array of new notes.
   */
  replaceSelectedNotes(notes: Note[]) {
    return this.sendCommand("replace_selected_notes", {
      notes: notes.map(noteToTuple),
    });
  }

  /**
   * Available for audio clips only.
   * Converts the given sample time to beat time.
   * Raises an error if the sample is not warped.
   */
  sampleToBeatTime(sampleTime: number): Promise<number> {
    return this.sendCommand("sample_to_beat_time", [sampleTime]);
  }

  /**
   * Scrubs inside a clip.
   * `position` defines the position in beats that the scrub will start from.
   * The scrub will continue until `stop_scrub` is called.
   * Global quantization applies to the scrub's position and length.
   */
  scrub(position: number): Promise<void> {
    return this.sendCommand("scrub", [position]);
  }

  /**
   * Available for audio clips only.
   * Converts the given seconds to sample time.
   * Raises an error if the sample is warped.
   */
  secondsToSampleTime(seconds: number): Promise<number> {
    return this.sendCommand("seconds_to_sample_time", [seconds]);
  }

  /**
   * Selects all notes present in the clip.
   */
  selectAllNotes(): Promise<void> {
    return this.sendCommand("select_all_notes");
  }

  /**
   * Set the clip's fire button state directly.
   * Supports all launch modes.
   */
  setFireButtonState(state: boolean): Promise<void> {
    return this.sendCommand("set_fire_button_state", [state]);
  }

  /**
   * Adds the given notes to the clip.
   */
  setNotes(notes: Note[]): Promise<void> {
    return this.sendCommand("set_notes", { notes: notes.map(noteToTuple) });
  }

  /**
   * Stop playig this clip.
   */
  stop(): Promise<void> {
    return this.sendCommand("stop");
  }

  /**
   * Stops the current scrub.
   */
  stopScrub(): Promise<void> {
    return this.sendCommand("stop_scrub");
  }
}
