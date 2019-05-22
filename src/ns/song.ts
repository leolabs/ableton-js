import { Ableton } from "..";
import { Namespace } from ".";
import { Track, RawTrack } from "./track";
import { CuePoint, RawCuePoint } from "./cue-point";

export interface GettableProperties {
  arrangement_overdub: number;
  back_to_arranger: number;
  can_capture_midi: number;
  can_jump_to_next_cue: number;
  can_jump_to_prev_cue: number;
  can_redo: number;
  can_undo: number;
  clip_trigger_quantization: number;
  count_in_duration: number;
  cue_points: RawCuePoint[];
  current_song_time: number;
  exclusive_arm: boolean;
  exclusive_solo: boolean;
  groove_amount: number;
  is_counting_in: number;
  is_playing: number;
  last_event_time: number;
  loop: number;
  loop_length: number;
  loop_start: number;
  master_track: RawTrack;
  metronome: number;
  midi_recording_quantization: number;
  nudge_down: number;
  nudge_up: number;
  overdub: number;
  punch_in: number;
  punch_out: number;
  re_enable_automation_enabled: number;
  record_mode: number;
  return_tracks: RawTrack[];
  root_note: number;
  scale_name: number;
  scenes: number;
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
  view: number;
  visible_tracks: RawTrack[];
}

export interface TransformedProperties {
  cue_points: CuePoint[];
  master_track: Track;
  return_tracks: Track[];
  tracks: Track[];
  visible_tracks: Track[];
}

export interface SettableProperties {
  arrangement_overdub: number;
  back_to_arranger: number;
  clip_trigger_quantization: number;
  count_in_duration: number;
  current_song_time: number;
  exclusive_arm: number;
  exclusive_solo: number;
  groove_amount: number;
  is_counting_in: number;
  is_playing: number;
  last_event_time: number;
  loop: number;
  loop_length: number;
  loop_start: number;
  master_track: number;
  metronome: number;
  midi_recording_quantization: number;
  nudge_down: number;
  nudge_up: number;
  overdub: number;
  punch_in: number;
  punch_out: number;
  re_enable_automation_enabled: number;
  record_mode: number;
  return_tracks: number;
  root_note: number;
  scale_name: number;
  scenes: number;
  select_on_launch: number;
  session_automation_record: number;
  session_record: number;
  session_record_status: number;
  signature_denominator: number;
  signature_numerator: number;
  song_length: number;
  swing_amount: number;
  tempo: number;
  tracks: number;
  view: number;
  visible_tracks: number;
}

export interface ObservableProperties {
  arrangement_overdub: number;
  back_to_arranger: number;
  can_capture_midi: number;
  can_jump_to_next_cue: number;
  can_jump_to_prev_cue: number;
  count_in_duration: number;
  cue_points: number;
  current_song_time: number;
  data: number;
  exclusive_arm: number;
  groove_amount: number;
  is_counting_in: number;
  is_playing: number;
  loop_length: number;
  loop: number;
  loop_start: number;
  metronome: number;
  nudge_down: number;
  nudge_up: number;
  overdub: number;
  punch_in: number;
  punch_out: number;
  re_enable_automation_enabled: number;
  record_mode: number;
  scenes: number;
  session_automation_record: number;
  session_record: number;
  session_record_status: number;
  signature_denominator: number;
  signature_numerator: number;
  song_length: number;
  swing_amount: number;
  tempo: number;
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
      cue_points: points => points.map(c => new CuePoint(this.ableton, c)),
      master_track: track => new Track(this.ableton, track),
      return_tracks: tracks => tracks.map(t => new Track(this.ableton, t)),
      tracks: tracks => tracks.map(t => new Track(this.ableton, t)),
      visible_tracks: tracks => tracks.map(t => new Track(this.ableton, t)),
    };
  }

  async jumpToCue(time: number) {
    return this.ableton.sendCommand(this.ns, "", "jump_to_cue", { time });
  }
}
