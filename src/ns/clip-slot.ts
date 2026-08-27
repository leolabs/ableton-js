import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Color } from "../util/color.js";
import { Clip, RawClip } from "./clip.js";

export type PlayingStatus = "stopped" | "started" | "recording";

export interface GettableProperties {
  clip: RawClip | null;
  color: number;
  color_index: number;
  controls_other_clips: boolean;
  has_clip: boolean;
  has_stop_button: boolean;
  is_group_slot: boolean;
  is_playing: boolean;
  is_recording: boolean;
  is_triggered: boolean;
  playing_status: PlayingStatus;
  will_record_on_start: boolean;
}

export interface TransformedProperties {
  clip: Clip | null;
  color: Color;
}

export interface SettableProperties {
  color: number;
}

export interface ObservableProperties {
  color_index: number;
  color: number;
  controls_other_clips: boolean;
  has_clip: boolean;
  has_stop_button: boolean;
  is_triggered: boolean;
  playing_status: PlayingStatus;
}

export interface RawClipSlot {
  readonly id: string;
  readonly color: number;
  readonly has_clip: boolean;
  readonly is_playing: boolean;
  readonly is_recording: boolean;
  readonly is_triggered: boolean;
}

/**
 * This class represents an entry in Live's Session view matrix.
 */
export class ClipSlot extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawClipSlot,
  ) {
    super(ableton, "clip_slot", raw.id);

    this.transformers = {
      clip: (c) => (c ? new Clip(ableton, c) : null),
      color: (c) => new Color(c),
    };

    this.cachedProps = {
      clip: true,
    };
  }

  /**
   * Creates an empty clip with the given length in the slot.
   * Throws an error when called on non-empty slots or slots in non-MIDI tracks.
   */
  public async createClip(length: number) {
    return this.sendCommand("create_clip", [length]);
  }

  /**
   * Removes the clip contained in the slot.
   * Raises an exception if the slot was empty.
   */
  public async deleteClip() {
    return this.sendCommand("delete_clip");
  }

  /**
   * Duplicates the slot's clip to the target slot, replacing any clip there.
   * Raises if the source is empty, types differ (audio vs MIDI), or either
   * slot is a group slot.
   */
  public async duplicateClipTo(slotOrId: ClipSlot | string) {
    return this.sendCommand("duplicate_clip_to", {
      slot_id: typeof slotOrId === "string" ? slotOrId : slotOrId.raw.id,
    });
  }

  /**
   * Fires a Clip if this Clipslot owns one,
   * else triggers the stop button, if we have one.
   */
  public async fire() {
    return this.sendCommand("fire");
  }

  /**
   * Sets the ClipSlot's fire button state directly.
   * Supports all launch modes.
   */
  public async setFireButtonState(state: boolean) {
    return this.sendCommand("set_fire_button_state", [state]);
  }

  /**
   * Stops playing the contained Clip,
   * if there is a Clip and its currently playing.
   */
  public async stop() {
    return this.sendCommand("stop");
  }
}
