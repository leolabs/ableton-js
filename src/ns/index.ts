import { Ableton } from "..";

export class Namespace<GP, TP, SP, OP> {
  constructor(
    protected ableton: Ableton,
    protected ns: string,
    protected nsid?: number,
  ) {}

  protected transformers: Partial<
    { [T in Extract<keyof GP, keyof TP>]: (val: GP[T]) => TP[T] }
  > = {};

  async get<T extends keyof GP>(
    prop: T,
  ): Promise<T extends keyof TP ? TP[T] : GP[T]> {
    const res = await this.ableton.getProp(this.ns, this.nsid, String(prop));
    const transformer = this.transformers[
      (prop as any) as Extract<keyof GP, keyof TP>
    ];

    if (res !== null && transformer) {
      return transformer(res) as any;
    } else {
      return res;
    }
  }

  async set<T extends keyof SP>(prop: T, value: SP[T]): Promise<null> {
    return this.ableton.setProp(this.ns, this.nsid, String(prop), value);
  }

  async addListener<T extends keyof OP>(
    prop: T,
    listener: (data: T extends keyof TP ? TP[T] : OP[T]) => any,
  ) {
    const transformer = this.transformers[
      (prop as any) as Extract<keyof GP, keyof TP>
    ];
    return this.ableton.addPropListener(
      this.ns,
      this.nsid,
      String(prop),
      (data) => {
        if (data !== null && transformer) {
          listener(transformer(data) as any);
        } else {
          listener(data);
        }
      },
    );
  }

  /**
   * Sends a raw function invocation to Ableton.
   * This should be used with caution.
   */
  async sendCommand(
    name: string,
    args?: { [k: string]: any },
    timeout?: number,
  ) {
    return this.ableton.sendCommand(this.ns, this.nsid, name, args, timeout);
  }
}
