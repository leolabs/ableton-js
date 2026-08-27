import { Ableton } from "../index.js";

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

  /** Returns the value of a gettable property on this Live object. */
  public async get<T extends keyof GP>(
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

  /** Sets a settable property on this Live object. */
  public async set<T extends keyof SP>(prop: T, value: SP[T]): Promise<null> {
    return this.ableton.setProp(this.ns, this.nsid, String(prop), value);
  }

  /**
   * Returns readable property names discovered on the Live object via introspection.
   *
   * This is mainly for exploring Live's API, and not all properties might be fully
   * supported by Ableton.js yet.
   */
  public async getAvailableProperties(): Promise<string[]> {
    return this.sendCommand("get_available_properties");
  }

  /**
   * Returns observable property names (Live `add_<prop>_listener` APIs).
   *
   * This is mainly for exploring Live's API, and not all properties might be fully
   * supported by Ableton.js yet.
   */
  public async getObservableProperties(): Promise<string[]> {
    return this.sendCommand("get_observable_properties");
  }

  /**
   * Returns callable method names discovered on the Live object via introspection.
   *
   * This is mainly for exploring Live's API, and not all functions might be fully
   * supported by Ableton.js yet.
   */
  public async getAvailableFunctions(): Promise<string[]> {
    return this.sendCommand("get_available_functions");
  }

  /**
   * Subscribes to changes of an observable property on this Live object.
   * Returns an unsubscribe function.
   */
  public async addListener<T extends keyof OP>(
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
  public async sendCommand(
    name: string,
    args?: { [k: string]: any },
    etag?: string,
    timeout?: number,
  ) {
    return this.ableton.sendCommand({
      ns: this.ns,
      nsid: this.nsid,
      name,
      args,
      etag,
      timeout,
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
