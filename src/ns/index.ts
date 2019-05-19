import { Ableton } from "..";

export class Namespace<P, OP> {
  constructor(protected ableton: Ableton, protected ns: string) {}

  async get(prop: P) {
    return this.ableton.getProp(this.ns, String(prop));
  }

  async set(prop: P, value: any) {
    return this.ableton.setProp(this.ns, String(prop), value);
  }

  async addListener(prop: OP, listener: (data: any) => any) {
    this.ableton.addListener(this.ns, String(prop), listener);
  }

  async removeListener(prop: OP, eventId: string) {
    this.ableton.removeListener(this.ns, String(prop), eventId);
  }
}
