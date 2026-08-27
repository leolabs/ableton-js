import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Color } from "../util/color.js";
import { DeviceParameter } from "./device-parameter.js";
import { Envelope } from "./envelope.js";
import {
  Note,
  NoteExtended,
  noteToTuple,
  NoteTuple,
  tupleToNote,
} from "../util/note.js";

export type WarpMode =
  | "beats"
  | "tones"
  | "texture"
  | "repitch"
  | "complex"
  | "rex"
  | "complex_pro";

export type LaunchMode = "trigger" | "gate" | "toggle" | "repeat";

export type LaunchQuantization =
  | "q_global"
  | "q_none"
  | "q_8_bars"
  | "q_4_bars"
  | "q_2_bars"
  | "q_bar"
  | "q_half"
  | "q_half_triplet"
  | "q_quarter"
  | "q_quarter_triplet"
  | "q_eighth"
  | "q_eighth_triplet"
  | "q_sixteenth"
  | "q_sixteenth_triplet"
  | "q_thirtysecond";

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
  readonly id: string;
  readonly name: string;
  readonly color: number;
  readonly color_index: number;
  readonly is_audio_clip: boolean;
  readonly is_midi_clip: boolean;
  readonly start_time: number;
  readonly end_time: number;
  readonly muted: boolean;
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
  constructor(
    ableton: Ableton,
    public readonly raw: RawClip,
  ) {
    super(ableton, "clip", raw.id);

    this.transformers = {
      color: (c) => new Color(c),
      notes: (n) => (n as NoteTuple[]).map(tupleToNote),
    };
  }

  /**
   * Available for audio clips only.
   * Converts the given beat time to sample time.
   * Raises an error if the sample is not warped.
   */
  public async beatToSampleTime(beats: number): Promise<number> {
    return this.sendCommand("beat_to_sample_time", [beats]);
  }

  /**
   * Clears all envelopes for this clip.
   */
  public async clearAllEnvelopes(): Promise<void> {
    return this.sendCommand("clear_all_envelopes");
  }

  /**
   * Returns the envelope for the given parameter, or `null` if it does not
   * exist. Arrangement clips and parameters from another track always return `null`.
   */
  public async automationEnvelope(
    parameterOrId: DeviceParameter | string,
  ): Promise<Envelope | null> {
    const raw = await this.sendCommand("automation_envelope", {
      parameter_id:
        typeof parameterOrId === "string"
          ? parameterOrId
          : parameterOrId.raw.id,
    });
    return raw ? new Envelope(this.ableton, raw) : null;
  }

  /**
   * Clears the envelope of this clip's given parameter.
   */
  public async clearEnvelope(
    parameterOrId: DeviceParameter | string,
  ): Promise<void> {
    return this.sendCommand("clear_envelope", {
      parameter_id:
        typeof parameterOrId === "string"
          ? parameterOrId
          : parameterOrId.raw.id,
    });
  }

  /**
   * Creates an envelope for a given parameter and returns it.
   * This should only be used if the envelope doesn't exist.
   * Raises an error if the envelope can't be created.
   */
  public async createAutomationEnvelope(
    parameterOrId: DeviceParameter | string,
  ): Promise<Envelope> {
    const raw = await this.sendCommand("create_automation_envelope", {
      parameter_id:
        typeof parameterOrId === "string"
          ? parameterOrId
          : parameterOrId.raw.id,
    });
    return new Envelope(this.ableton, raw);
  }

  /**
   * Crops the clip. The region that is cropped depends on whether
   * the clip is looped or not. If looped, the region outside of
   * the loop is removed. If not looped, the region outside
   * the start and end markers is removed.
   */
  public async crop(): Promise<void> {
    return this.sendCommand("crop");
  }

  /**
   * Deselects all notes present in the clip.
   */
  public async deselectAllNotes(): Promise<void> {
    return this.sendCommand("deselect_all_notes");
  }

  /**
   * Makes the loop twice as long and duplicates notes and envelopes.
   * Duplicates the clip start/end range if the clip is not looped.
   */
  public async duplicateLoop(): Promise<void> {
    return this.sendCommand("duplicate_loop");
  }

  /**
   * Duplicates the notes in the specified region to the destination_time.
   * Only notes of the specified pitch are duplicated if pitch is not -1.
   * If the transposition_amount is not 0, the notes in the region will be
   * transposed by the transposition_amount of semitones.
   * Raises an error on audio clips.
   */
  public async duplicateRegion(
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
  public async fire(): Promise<void> {
    return this.sendCommand("fire");
  }

  /**
   * Returns all notes that match the given range.
   */
  public async getNotes(
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
   * Returns all notes matching the given range with extended properties.
   * Compared to getNotes, this method returns additional note information.
   */
  public async getNotesExtended(
    fromTime: number,
    fromPitch: number,
    timeSpan: number,
    pitchSpan: number,
  ): Promise<NoteExtended[]> {
    return this.sendCommand("get_notes_extended", {
      from_pitch: fromPitch,
      pitch_span: pitchSpan,
      from_time: fromTime,
      time_span: timeSpan,
    });
  }

  /**
   * Returns the clip's currently selected notes.
   */
  public async getSelectedNotes(): Promise<Note[]> {
    const notes: NoteTuple[] = await this.sendCommand("get_selected_notes");
    return notes.map(tupleToNote);
  }

  /**
   * Returns the clip's currently selected notes with extended properties.
   */
  public async getSelectedNotesExtended(): Promise<NoteExtended[]> {
    return this.sendCommand("get_selected_notes_extended");
  }

  /**
   *  Available since Live 11.0. Replaces modifying notes with remove_notes followed by set_notes.
   */
  public async applyNoteModifications(notes: NoteExtended[]) {
    return this.sendCommand("apply_note_modifications", { notes });
  }

  /**
   * Jumps forward or backward by the specified relative amount in beats.
   * Does nothing if the clip is not playing.
   */
  public async movePlayingPos(amount: number): Promise<void> {
    return this.sendCommand("move_playing_pos", [amount]);
  }

  /**
   * Quantizes all notes in a clip or aligns warp markers.
   */
  public async quantize(grid: number, amount: number): Promise<void> {
    return this.sendCommand("quantize", [grid, amount]);
  }

  /**
   * Quantizes all the notes of a given pitch.
   */
  public async quantizePitch(
    pitch: number,
    grid: number,
    amount: number,
  ): Promise<void> {
    return this.sendCommand("quantize_pitch", [pitch, grid, amount]);
  }

  /**
   * Deletes all notes that start in the given area.
   *
   * @deprecated starting with Live 11, use `removeNotesExtended` instead
   */
  public async removeNotes(
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
   * Deletes all notes that start in the given area.
   */
  public async removeNotesExtended(
    fromTime: number,
    fromPitch: number,
    timeSpan: number,
    pitchSpan: number,
  ) {
    return this.sendCommand("remove_notes_extended", [
      fromPitch,
      pitchSpan,
      fromTime,
      timeSpan,
    ]);
  }

  /**
   * Removes notes by given note ids.
   * Available since Live 11.0.
   */
  public async removeNotesById(ids: number[]) {
    return this.sendCommand("remove_notes_by_id", [ids]);
  }

  /**
   * Replaces selected notes with an array of new notes.
   */
  public async replaceSelectedNotes(notes: Note[]) {
    return this.sendCommand("replace_selected_notes", {
      notes: notes.map(noteToTuple),
    });
  }

  /**
   * Available for audio clips only.
   * Converts the given sample time to beat time.
   * Raises an error if the sample is not warped.
   */
  public async sampleToBeatTime(sampleTime: number): Promise<number> {
    return this.sendCommand("sample_to_beat_time", [sampleTime]);
  }

  /**
   * Scrubs inside a clip.
   * `position` defines the position in beats that the scrub will start from.
   * The scrub will continue until `stop_scrub` is called.
   * Global quantization applies to the scrub's position and length.
   */
  public async scrub(position: number): Promise<void> {
    return this.sendCommand("scrub", [position]);
  }

  /**
   * Available for audio clips only.
   * Converts the given seconds to sample time.
   * Raises an error if the sample is warped.
   */
  public async secondsToSampleTime(seconds: number): Promise<number> {
    return this.sendCommand("seconds_to_sample_time", [seconds]);
  }

  /**
   * Selects all notes present in the clip.
   */
  public async selectAllNotes(): Promise<void> {
    return this.sendCommand("select_all_notes");
  }

  /**
   * Sets the clip's fire button state directly.
   * Supports all launch modes.
   */
  public async setFireButtonState(state: boolean): Promise<void> {
    return this.sendCommand("set_fire_button_state", [state]);
  }

  /**
   * Adds the given notes to the clip.
   */
  public async setNotes(notes: Note[]): Promise<void> {
    return this.sendCommand("set_notes", { notes: notes.map(noteToTuple) });
  }

  /**
   * Stops playing this clip.
   */
  public async stop(): Promise<void> {
    return this.sendCommand("stop");
  }

  /**
   * Stops the current scrub.
   */
  public async stopScrub(): Promise<void> {
    return this.sendCommand("stop_scrub");
  }
}
