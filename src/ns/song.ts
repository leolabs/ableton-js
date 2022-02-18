import { Ableton } from "..";
import { Namespace } from ".";
import { Track, RawTrack } from "./track";
import { CuePoint, RawCuePoint } from "./cue-point";
import { SongView } from "./song-view";
import { Scene, RawScene } from "./scene";

export interface GettableProperties {
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
  groove_amount: number;
  is_counting_in: boolean;
  is_playing: boolean;
  last_event_time: number;
  loop: boolean;
  loop_length: number;
  loop_start: number;
  master_track: RawTrack;
  metronome: number;
  midi_recording_quantization: RecordingQuantization;
  nudge_down: boolean;
  nudge_up: boolean;
  overdub: boolean;
  punch_in: boolean;
  punch_out: boolean;
  re_enable_automation_enabled: number;
  record_mode: number;
  return_tracks: RawTrack[];
  root_note: number;
  scale_name: number;
  scenes: RawScene[];
  select_on_launch: number;
  session_automation_record: number;
  session_record: number;
  session_record_status: number;
  signature_denominator: number;
  signature_numerator: number;
  song_length: number;
  swing_amount: number;
  tempo: number;
  tracks: RawTrack[];
  // view: never; - Not needed here
  visible_tracks: RawTrack[];
}

export interface TransformedProperties {
  cue_points: CuePoint[];
  master_track: Track;
  return_tracks: Track[];
  tracks: Track[];
  visible_tracks: Track[];
  //view: SongView; - Not needed here
  scenes: Scene[];
}

export interface SettableProperties {
  arrangement_overdub: boolean;
  back_to_arranger: number;
  clip_trigger_quantization: Quantization;
  count_in_duration: number;
  current_song_time: number;
  exclusive_arm: number;
  exclusive_solo: number;
  groove_amount: number;
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
  re_enable_automation_enabled: number;
  record_mode: number;
  return_tracks: number;
  root_note: number;
  scale_name: number;
  select_on_launch: number;
  session_automation_record: number;
  session_record: number;
  session_record_status: number;
  signature_denominator: number;
  signature_numerator: number;
  song_length: number;
  swing_amount: number;
  tempo: number;
  visible_tracks: number;
}

export interface ObservableProperties {
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
  re_enable_automation_enabled: number;
  record_mode: number;
  return_tracks: RawTrack[];
  scenes: RawScene[];
  session_automation_record: number;
  session_record: number;
  session_record_status: number;
  signature_denominator: number;
  signature_numerator: number;
  song_length: number;
  swing_amount: number;
  tempo: number;
  tracks: RawTrack[];
}

export interface SmpteTime {
  hours: number;
  minutes: number;
  seconds: number;
  frames: number;
}

export enum TimeFormat {
  MsTime = 0,
  Smpte24 = 1,
  Smpte25 = 2,
  Smpte29 = 3,
  Smpte30 = 4,
  Smpte30Drop = 5,
}

export enum Quantization {
  q_2_bars = "q_2_bars",
  q_4_bars = "q_4_bars",
  q_8_bars = "q_8_bars",
  q_bar = "q_bar",
  q_eight = "q_eight",
  q_eight_triplet = "q_eight_triplet",
  q_half = "q_half",
  q_half_triplet = "q_half_triplet",
  q_no_q = "q_no_q",
  q_quarter = "q_quarter",
  q_quarter_triplet = "q_quarter_triplet",
  q_sixtenth = "q_sixtenth",
  q_sixtenth_triplet = "q_sixtenth_triplet",
  q_thirtytwoth = "q_thirtytwoth",
}

export enum RecordingQuantization {
  rec_q_eight = "rec_q_eight",
  rec_q_eight_eight_triplet = "rec_q_eight_eight_triplet",
  rec_q_eight_triplet = "rec_q_eight_triplet",
  rec_q_no_q = "rec_q_no_q",
  rec_q_quarter = "rec_q_quarter",
  rec_q_sixtenth = "rec_q_sixtenth",
  rec_q_sixtenth_sixtenth_triplet = "rec_q_sixtenth_sixtenth_triplet",
  rec_q_sixtenth_triplet = "rec_q_sixtenth_triplet",
  rec_q_thirtysecond = "rec_q_thirtysecond",
}

export class Song extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "song");

    this.transformers = {
      cue_points: (points) => points.map((c) => new CuePoint(this.ableton, c)),
      master_track: (track) => new Track(this.ableton, track),
      return_tracks: (tracks) => tracks.map((t) => new Track(this.ableton, t)),
      tracks: (tracks) => tracks.map((t) => new Track(this.ableton, t)),
      visible_tracks: (tracks) => tracks.map((t) => new Track(this.ableton, t)),
      scenes: (scenes) => scenes.map((s) => new Scene(this.ableton, s)),
    };
  }

  public view = new SongView(this.ableton);

  public async beginUndoStep() {
    return this.sendCommand("begin_undo_step");
  }

  public async continuePlaying() {
    return this.sendCommand("continue_playing");
  }

  public async createAudioTrack(index?: number) {
    return this.sendCommand("create_audio_track", [index]);
  }

  public async createMidiTrack(index?: number) {
    return this.sendCommand("create_midi_track", [index]);
  }

  public async createReturnTrack(index?: number) {
    return this.sendCommand("create_return_track", [index]);
  }

  public async createScene(index?: number) {
    return this.sendCommand("create_scene", [index]);
  }

  public async deleteReturnTrack(index: number) {
    return this.sendCommand("delete_return_track", [index]);
  }

  public async deleteScene(index: number) {
    return this.sendCommand("delete_scene", [index]);
  }

  public async deleteTrack(index: number) {
    return this.sendCommand("delete_track", [index]);
  }

  public async duplicateScene(index: number) {
    return this.sendCommand("duplicate_scene", [index]);
  }

  public async duplicateTrack(index: number) {
    return this.sendCommand("duplicate_track", [index]);
  }

  public async endUndoStep() {
    return this.sendCommand("end_undo_step");
  }

  public async getData(key: string) {
    return this.sendCommand("get_data", { key });
  }

  public async getCurrentSmpteSongTime(
    timeFormat: TimeFormat,
  ): Promise<SmpteTime> {
    return this.sendCommand("get_current_smpte_song_time", { timeFormat });
  }

  public async isCuePointSelected() {
    return this.sendCommand("is_cue_point_selected");
  }

  public async jumpBy(amount: number) {
    return this.sendCommand("jump_by", [amount]);
  }

  public async jumpToNextCue() {
    return this.sendCommand("jump_to_next_cue");
  }

  public async jumpToPrevCue() {
    return this.sendCommand("jump_to_prev_cue");
  }

  public async playSelection() {
    return this.sendCommand("play_selection");
  }

  public async scrubBy(amount: number) {
    return this.sendCommand("scrub_by", [amount]);
  }

  public async setData(key: string, value: any) {
    return this.sendCommand("set_data", [key, value]);
  }

  public async startPlaying() {
    return this.sendCommand("start_playing");
  }

  public async stopAllClips() {
    return this.sendCommand("stop_all_clips");
  }

  public async stopPlaying() {
    return this.sendCommand("stop_playing");
  }

  public async tapTempo() {
    return this.sendCommand("tap_tempo");
  }
}
