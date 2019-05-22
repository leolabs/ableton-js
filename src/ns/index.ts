import { Ableton } from "..";

export class Namespace<GP, SP, OP> {
  constructor(
    protected ableton: Ableton,
    protected ns: string,
    protected nsid?: string,
  ) {}

  async get(prop: GP) {
    return this.ableton.getProp(this.ns, this.nsid, String(prop));
  }

  async set(prop: SP, value: any) {
    return this.ableton.setProp(this.ns, this.nsid, String(prop), value);
  }

  async addListener(prop: OP, listener: (data: any) => any) {
    this.ableton.addListener(this.ns, this.nsid, String(prop), listener);
  }

  async removeListener(prop: OP, eventId: string) {
    this.ableton.removeListener(this.ns, this.nsid, String(prop), eventId);
  }
}
