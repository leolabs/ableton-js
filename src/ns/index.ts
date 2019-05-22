import { Ableton } from "..";

export class Namespace<GP, TP, SP, OP> {
  constructor(
    protected ableton: Ableton,
    protected ns: string,
    protected nsid?: string,
  ) {}

  public transformers: Partial<
    { [T in keyof GP]: (val: GP[T]) => Promise<any> | any }
  > = {};

  async get<T extends keyof GP>(
    prop: T,
  ): Promise<T extends keyof TP ? TP[T] : GP[T]> {
    const res = await this.ableton.getProp(this.ns, this.nsid, String(prop));
    const transformer = this.transformers[prop];

    if (transformer) {
      return transformer(res);
    } else {
      return res;
    }
  }

  async set<T extends keyof SP>(prop: T, value: SP[T]): Promise<null> {
    return this.ableton.setProp(this.ns, this.nsid, String(prop), value);
  }

  async addListener(prop: OP, listener: (data: any) => any) {
    this.ableton.addListener(this.ns, this.nsid, String(prop), listener);
  }

  async removeListener(prop: OP, eventId: string) {
    this.ableton.removeListener(this.ns, this.nsid, String(prop), eventId);
  }
}
