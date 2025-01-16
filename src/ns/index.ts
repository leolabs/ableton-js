import { Ableton } from "..";

export class Namespace<GP, TP, SP, OP> {
  protected transformers: {
    [T in keyof TP]: (val: T extends keyof GP ? GP[T] : unknown) => TP[T];
  } = {} as any;

  protected cachedProps: Partial<{
    [T in keyof GP]: boolean;
  }> = {};

  constructor(
    protected ableton: Ableton,
    protected ns: string,
    protected nsid?: string,
  ) {}

  async get<T extends keyof GP>(
    prop: T,
    useCache?: boolean,
  ): Promise<T extends keyof TP ? TP[T] : GP[T]> {
    const cache = useCache ?? !!this.cachedProps[prop];
    const res = await this.ableton.getProp(
      this.ns,
      this.nsid,
      String(prop),
      cache,
    );

    const transformer =
      this.transformers[prop as any as Extract<keyof GP, keyof TP>];

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
    const transformer =
      this.transformers[prop as any as Extract<keyof GP, keyof TP>];
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
  async sendCommand(name: string, args?: { [k: string]: any }, etag?: string) {
    return this.ableton.sendCommand({
      ns: this.ns,
      nsid: this.nsid,
      name,
      args,
      etag,
    });
  }

  /**
   * Sends a raw function invocation to Ableton and expects the
   * result to be a CacheResponse with `data` and an `etag`.
   */
  protected async sendCachedCommand(name: string, args?: { [k: string]: any }) {
    return this.ableton.sendCachedCommand({
      ns: this.ns,
      nsid: this.nsid,
      name,
      args,
    });
  }
}
