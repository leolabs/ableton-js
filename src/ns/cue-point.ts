import { Ableton } from "..";
import { Namespace } from ".";

export type GettableProperty = "name" | "time";
export type SettableProperty = "name" | "time";
export type ObservableProperty = "name" | "time";

export class CuePoint extends Namespace<
  GettableProperty,
  SettableProperty,
  ObservableProperty
> {
  constructor(ableton: Ableton, nsid: string) {
    super(ableton, "cue-point", nsid);
  }

  async jump() {
    return this.ableton.sendCommand("cue-point", this.nsid, "jump");
  }
}
