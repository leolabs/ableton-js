/**
 * A minimal, controllable stand-in for the global `WebSocket` used by
 * {@link Ableton}, for tests that exercise connection-lifecycle behavior
 * (reconnects, timeouts, auth) without needing a real Live instance running.
 */
export class FakeWebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  /** Every instance created while installed, in creation order. */
  static instances: FakeWebSocket[] = [];

  readyState: number = FakeWebSocket.CONNECTING;
  readonly sent: string[] = [];

  private listeners: Record<string, Array<(event: any) => void>> = {};
  private once: Record<string, Array<(event: any) => void>> = {};

  constructor(public readonly url: string) {
    FakeWebSocket.instances.push(this);
  }

  addEventListener(
    type: string,
    cb: (event: any) => void,
    options?: { once?: boolean },
  ) {
    const bucket = options?.once ? this.once : this.listeners;
    if (!bucket[type]) {
      bucket[type] = [];
    }
    bucket[type].push(cb);
  }

  send(msg: string) {
    if (this.readyState !== FakeWebSocket.OPEN) {
      throw new Error("FakeWebSocket is not open");
    }
    this.sent.push(msg);
  }

  close() {
    if (this.readyState === FakeWebSocket.CLOSED) {
      return;
    }
    this.readyState = FakeWebSocket.CLOSED;
    this.dispatch("close", {});
  }

  /** Simulates the transport-level connection completing. */
  open() {
    this.readyState = FakeWebSocket.OPEN;
    this.dispatch("open", {});
  }

  /** Simulates a text frame arriving from the (fake) server. */
  receive(data: unknown) {
    this.dispatch("message", { data: JSON.stringify(data) });
  }

  /** Parses the most recently sent frame as a command envelope. */
  lastEnvelope<T = { uuid: string; commands: any[] }>(): T {
    const msg = this.sent[this.sent.length - 1];
    if (msg === undefined) {
      throw new Error("Nothing was sent yet");
    }
    return JSON.parse(msg);
  }

  private dispatch(type: string, event: any) {
    for (const cb of this.listeners[type] ?? []) {
      cb(event);
    }
    const once = this.once[type];
    if (once) {
      delete this.once[type];
      for (const cb of once) {
        cb(event);
      }
    }
  }
}

/**
 * Replaces `globalThis.WebSocket` with {@link FakeWebSocket} for the
 * duration of a test. Call `restore()` in an `afterEach`/`finally`.
 */
export function installFakeWebSocket() {
  const original = (globalThis as any).WebSocket;
  FakeWebSocket.instances = [];
  (globalThis as any).WebSocket = FakeWebSocket;

  return {
    /** The most recently constructed fake socket (one per connection attempt). */
    latest: (): FakeWebSocket => {
      const ws = FakeWebSocket.instances[FakeWebSocket.instances.length - 1];
      if (!ws) {
        throw new Error("No FakeWebSocket has been constructed yet");
      }
      return ws;
    },
    restore: () => {
      (globalThis as any).WebSocket = original;
    },
  };
}

/** Completes the initial handshake on `ws` as the real plugin would. */
export function acceptConnection(
  ws: FakeWebSocket,
  data: Record<string, unknown> = {},
) {
  ws.open();
  ws.receive({ event: "connect", uuid: null, data: { port: 39031, ...data } });
}

/**
 * Auto-responds to every command envelope sent on `ws` with `{ok: true,
 * data: null}` for each command, unless `handle` returns an explicit result
 * array (or `null` to simulate that envelope never getting a response).
 */
export function autoRespond(
  ws: FakeWebSocket,
  handle?: (envelope: {
    uuid: string;
    commands: any[];
  }) => Array<{ ok: boolean; data?: any; error?: string }> | null,
) {
  const originalSend = ws.send.bind(ws);
  ws.send = (msg: string) => {
    originalSend(msg);
    const envelope = JSON.parse(msg);
    const results = handle
      ? handle(envelope)
      : envelope.commands.map(() => ({ ok: true, data: null }));
    if (results) {
      ws.receive({ event: "result", uuid: envelope.uuid, data: results });
    }
  };
}
