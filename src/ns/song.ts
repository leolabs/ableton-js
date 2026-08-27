import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Track, RawTrack } from "./track.js";
import { CuePoint, RawCuePoint } from "./cue-point.js";
import { SongView } from "./song-view.js";
import { Scene, RawScene } from "./scene.js";
import { RawDevice } from "./device.js";
import { GroovePool } from "./groove-pool.js";
import { TuningSystem, RawTuningSystem } from "./tuning-system.js";

export interface GettableProperties {
  appointed_device: RawDevice;
  arrangement_overdub: boolean;
  back_to_arranger: number;
  can_capture_midi: boolean;
  can_jump_to_next_cue: boolean;
  can_jump_to_prev_cue: boolean;
  can_redo: boolean;
  can_undo: boolean;
  clip_trigger_quantization: Quantization;
  count_in_duration: number;
  cue_points: RawCuePoint[];
  current_song_time: number;
  exclusive_arm: boolean;
  exclusive_solo: boolean;
  file_path: string;
  groove_amount: number;
  is_ableton_link_enabled: boolean;
  is_ableton_link_start_stop_sync_enabled: boolean;
  is_counting_in: boolean;
  is_playing: boolean;
  last_event_time: number;
  loop: boolean;
  loop_length: number;
  loop_start: number;
  master_track: RawTrack;
  metronome: number;
  midi_recording_quantization: RecordingQuantization;
  name: string;
  nudge_down: boolean;
  nudge_up: boolean;
  overdub: boolean;
  punch_in: boolean;
  punch_out: boolean;
  re_enable_automation_enabled: boolean;
  record_mode: number;
  return_tracks: RawTrack[];
  root_note: number;
  scale_intervals: number[];
  scale_mode: boolean;
  scale_name: string;
  scenes: RawScene[];
  select_on_launch: number;
  session_automation_record: number;
  session_record: number;
  session_record_status: number;
  signature_denominator: number;
  signature_numerator: number;
  song_length: number;
  start_time: number;
  swing_amount: number;
  tempo: number;
  tempo_follower_enabled: boolean;
  tracks: RawTrack[];
  tuning_system: RawTuningSystem | null;
  // groove_pool / view: exposed as song.groovePool / song.view
  visible_tracks: RawTrack[];
}

export interface TransformedProperties {
  cue_points: CuePoint[];
  master_track: Track;
  return_tracks: Track[];
  tracks: Track[];
  tuning_system: TuningSystem | null;
  visible_tracks: Track[];
  scenes: Scene[];
}

export interface SettableProperties {
  appointed_device: string;
  arrangement_overdub: boolean;
  back_to_arranger: number;
  clip_trigger_quantization: Quantization;
  count_in_duration: number;
  current_song_time: number;
  exclusive_arm: number;
  exclusive_solo: number;
  groove_amount: number;
  is_ableton_link_enabled: boolean;
  is_ableton_link_start_stop_sync_enabled: boolean;
  is_counting_in: boolean;
  is_playing: boolean;
  last_event_time: number;
  loop: boolean;
  loop_length: number;
  loop_start: number;
  master_track: number;
  metronome: number;
  midi_recording_quantization: RecordingQuantization;
  nudge_down: boolean;
  nudge_up: boolean;
  overdub: boolean;
  punch_in: boolean;
  punch_out: boolean;
  re_enable_automation_enabled: boolean;
  record_mode: number;
  return_tracks: number;
  root_note: number;
  scale_mode: boolean;
  scale_name: string;
  select_on_launch: number;
  session_automation_record: number;
  session_record: number;
  session_record_status: number;
  signature_denominator: number;
  signature_numerator: number;
  song_length: number;
  start_time: number;
  swing_amount: number;
  tempo: number;
  tempo_follower_enabled: boolean;
  visible_tracks: number;
}

export interface ObservableProperties {
  appointed_device: RawDevice;
  arrangement_overdub: boolean;
  back_to_arranger: number;
  can_capture_midi: boolean;
  can_jump_to_next_cue: boolean;
  can_jump_to_prev_cue: boolean;
  clip_trigger_quantization: Quantization;
  count_in_duration: number;
  cue_points: number;
  current_song_time: number;
  data: number;
  exclusive_arm: number;
  groove_amount: number;
  is_ableton_link_enabled: boolean;
  is_ableton_link_start_stop_sync_enabled: boolean;
  is_counting_in: boolean;
  is_playing: boolean;
  loop_length: number;
  loop: boolean;
  loop_start: number;
  metronome: number;
  midi_recording_quantization: RecordingQuantization;
  nudge_down: boolean;
  nudge_up: boolean;
  overdub: boolean;
  punch_in: boolean;
  punch_out: boolean;
  re_enable_automation_enabled: boolean;
  record_mode: number;
  return_tracks: RawTrack[];
  root_note: number;
  scale_intervals: number[];
  scale_mode: boolean;
  scale_name: string;
  scenes: RawScene[];
  session_automation_record: number;
  session_record: number;
  session_record_status: number;
  signature_denominator: number;
  signature_numerator: number;
  song_length: number;
  start_time: number;
  swing_amount: number;
  tempo: number;
  tempo_follower_enabled: boolean;
  tracks: RawTrack[];
  tuning_system: RawTuningSystem | null;
  visible_tracks: RawTrack[];
}

export interface SmpteTime {
  hours: number;
  minutes: number;
  seconds: number;
  frames: number;
}

export type TimeFormat =
  | "ms_time"
  | "smpte_24"
  | "smpte_25"
  | "smpte_30"
  | "smpte_30_drop"
  | "smpte_29";

export type Quantization =
  | "q_8_bars"
  | "q_4_bars"
  | "q_2_bars"
  | "q_bar"
  | "q_half"
  | "q_half_triplet"
  | "q_quarter"
  | "q_quarter_triplet"
  | "q_eight"
  | "q_eight_triplet"
  | "q_sixtenth"
  | "q_sixtenth_triplet"
  | "q_thirtytwoth"
  | "q_no_q";

export type RecordingQuantization =
  | "rec_q_eight"
  | "rec_q_eight_eight_triplet"
  | "rec_q_eight_triplet"
  | "rec_q_no_q"
  | "rec_q_quarter"
  | "rec_q_sixtenth"
  | "rec_q_sixtenth_sixtenth_triplet"
  | "rec_q_sixtenth_triplet"
  | "rec_q_thirtysecond";

export class Song extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "song");

    this.transformers = {
      cue_points: (points) => points.map((c) => new CuePoint(ableton, c)),
      master_track: (track) => new Track(ableton, track),
      return_tracks: (tracks) => tracks.map((t) => new Track(ableton, t)),
      tracks: (tracks) => tracks.map((t) => new Track(ableton, t)),
      tuning_system: (system) =>
        system ? new TuningSystem(ableton, system) : null,
      visible_tracks: (tracks) => tracks.map((t) => new Track(ableton, t)),
      scenes: (scenes) => scenes.map((s) => new Scene(ableton, s)),
    };

    this.cachedProps = {
      cue_points: true,
      master_track: true,
      return_tracks: true,
      tracks: true,
      tuning_system: true,
      visible_tracks: true,
      scenes: true,
    };
  }

  public readonly view = new SongView(this.ableton);
  public readonly groovePool = new GroovePool(this.ableton);

  /** Begins a grouped undo step for subsequent song edits. */
  public async beginUndoStep() {
    return this.sendCommand("begin_undo_step");
  }

  /** Continues playing the song from the current position. */
  public async continuePlaying() {
    return this.sendCommand("continue_playing");
  }

  /**
   * Creates a new audio track at the given index and returns it.
   * When `index` is `-1`, appends the track at the end.
   */
  public async createAudioTrack(index = -1) {
    const result = await this.sendCommand("create_audio_track", { index });
    return new Track(this.ableton, result);
  }

  /**
   * Creates a new MIDI track at the given index and returns it.
   * When `index` is `-1`, appends the track at the end.
   */
  public async createMidiTrack(index = -1) {
    const result = await this.sendCommand("create_midi_track", { index });
    return new Track(this.ableton, result);
  }

  /** Creates a new return track at the end and returns it. */
  public async createReturnTrack() {
    const result = await this.sendCommand("create_return_track");
    return new Track(this.ableton, result);
  }

  /**
   * Creates a new scene at the given index and returns it.
   * When `index` is `-1`, appends the scene at the end.
   */
  public async createScene(index = -1) {
    const result = await this.sendCommand("create_scene", { index });
    return new Scene(this.ableton, result);
  }

  /** Deletes the return track at the given index. */
  public async deleteReturnTrack(index: number) {
    return this.sendCommand("delete_return_track", [index]);
  }

  /** Deletes the scene at the given index. */
  public async deleteScene(index: number) {
    return this.sendCommand("delete_scene", [index]);
  }

  /** Deletes the track at the given index. */
  public async deleteTrack(index: number) {
    return this.sendCommand("delete_track", [index]);
  }

  /** Duplicates the scene at the given index and selects the new scene. */
  public async duplicateScene(index: number) {
    return this.sendCommand("duplicate_scene", [index]);
  }

  /** Duplicates the track at the given index and selects the new track. */
  public async duplicateTrack(index: number) {
    return this.sendCommand("duplicate_track", [index]);
  }

  /** Ends the current grouped undo step. */
  public async endUndoStep() {
    return this.sendCommand("end_undo_step");
  }

  /** Returns data previously stored on the song with {@link setData}. */
  public async getData(key: string) {
    return this.sendCachedCommand("get_data", { key });
  }

  /**
   * Returns the song's current playing position in the given SMPTE format.
   */
  public async getCurrentSmpteSongTime(
    timeFormat: TimeFormat,
  ): Promise<SmpteTime> {
    return this.sendCommand("get_current_smpte_song_time", { timeFormat });
  }

  /** Returns true when the global play position is currently on a cue point. */
  public async isCuePointSelected() {
    return this.sendCommand("is_cue_point_selected");
  }

  /** Moves the play position by the given amount relative to the current position. */
  public async jumpBy(amount: number) {
    return this.sendCommand("jump_by", [amount]);
  }

  /** Jumps to the next cue (marker) when possible. */
  public async jumpToNextCue() {
    return this.sendCommand("jump_to_next_cue");
  }

  /** Jumps to the previous cue (marker) when possible. */
  public async jumpToPrevCue() {
    return this.sendCommand("jump_to_prev_cue");
  }

  /** Starts playing the current selection, or does nothing when none is set. */
  public async playSelection() {
    return this.sendCommand("play_selection");
  }

  /** Discards overrides of automated parameters. */
  public async reEnableAutomation() {
    return this.sendCommand("re_enable_automation");
  }

  /** Redoes the last undone action. */
  public async redo() {
    return this.sendCommand("redo");
  }

  /**
   * Moves the play position by the given amount without stopping playback
   * (same as {@link jumpBy}, but keeps playing).
   */
  public async scrubBy(amount: number) {
    return this.sendCommand("scrub_by", [amount]);
  }

  /** Stores persistent data on the song for the given key. */
  public async setData(key: string, value: any) {
    return this.sendCommand("set_data", [key, value]);
  }

  /**
   * Deletes the selected cue when one is selected; otherwise creates a cue at
   * the current song time.
   */
  public async setOrDeleteCue() {
    return this.sendCommand("set_or_delete_cue");
  }

  /** Starts playing from the start marker. */
  public async startPlaying() {
    return this.sendCommand("start_playing");
  }

  /** Stops all playing clips while continuing song playback. */
  public async stopAllClips() {
    return this.sendCommand("stop_all_clips");
  }

  /** Stops playing the song. */
  public async stopPlaying() {
    return this.sendCommand("stop_playing");
  }

  /**
   * Starts playing only when Live is currently not playing, so Live does not
   * jump back to the start when already playing.
   *
   * @returns whether the command was executed
   */
  public async safeStartPlaying(): Promise<boolean> {
    return this.sendCommand("safe_start_playing");
  }

  /**
   * Stops playback only when Live is currently playing, so Live does not jump
   * back to the arrangement start when already stopped.
   *
   * @returns whether the command was executed
   */
  public async safeStopPlaying(): Promise<boolean> {
    return this.sendCommand("safe_stop_playing");
  }

  /** Triggers Live's tap-tempo function. */
  public async tapTempo() {
    return this.sendCommand("tap_tempo");
  }

  /** Undoes the last action. */
  public async undo() {
    return this.sendCommand("undo");
  }
}
