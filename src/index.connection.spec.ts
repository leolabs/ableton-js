import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  Ableton,
  type AbletonOptions,
  CommandError,
  TimeoutError,
} from "./index.js";
import {
  acceptConnection,
  type FakeWebSocket,
  installFakeWebSocket,
} from "./util/tests/fake-websocket.js";

/**
 * Connection-lifecycle tests that don't need a real Live instance - they
 * drive a {@link FakeWebSocket} directly to exercise reconnects, timeouts,
 * and error propagation that are impractical to trigger against real Live.
 */
describe("Ableton connection lifecycle (fake transport)", () => {
  let fake: ReturnType<typeof installFakeWebSocket>;
  let current: Ableton | undefined;

  beforeEach(() => {
    fake = installFakeWebSocket();
  });

  afterEach(async () => {
    await current?.close();
    current = undefined;
    fake.restore();
  });

  async function startFakeAbleton(options?: AbletonOptions) {
    const ableton = new Ableton(options);
    current = ableton;
    const startPromise = ableton.start();
    const ws = fake.latest();
    acceptConnection(ws);
    await startPromise;
    return { ableton, ws };
  }

  it("rejects a pending start() if close() runs before the connection is established", async () => {
    const ableton = new Ableton();
    current = ableton;

    const startPromise = ableton.start();
    // Never accept the connection - close() races the still-connecting socket.
    await ableton.close();

    await expect(startPromise).rejects.toThrow(
      "The client was closed before a connection could be established.",
    );
  });

  it("tears a socket down exactly once, even if its close event fires late", async () => {
    const { ableton, ws: ws1 } = await startFakeAbleton({
      heartbeatInterval: 30,
      commandTimeoutMs: 20,
    });

    const disconnects: string[] = [];
    const connects: string[] = [];
    ableton.on("disconnect", (t) => disconnects.push(t));
    ableton.on("connect", (t) => connects.push(t));

    // Never respond to the heartbeat ping, so it times out and the client
    // gives up on this socket.
    await new Promise((res) => setTimeout(res, 120));
    expect(disconnects).toEqual(["heartbeat"]);

    // Reconnects start at a 250ms backoff - wait past that.
    await new Promise((res) => setTimeout(res, 300));

    // A reconnect should already be under way on a brand new socket.
    const ws2 = fake.latest();
    expect(ws2).not.toBe(ws1);
    acceptConnection(ws2);
    await new Promise((res) => setTimeout(res, 20));
    expect(connects).toEqual(["realtime"]);

    // The old socket's "close" event finally arrives, after we already
    // tore it down ourselves - this must be a no-op, not a second teardown.
    (ws1 as FakeWebSocket).close();
    await new Promise((res) => setTimeout(res, 20));

    expect(disconnects).toEqual(["heartbeat"]);
    expect(connects).toEqual(["realtime"]);
  });

  it("still pings after a period of silence, even with a command stuck in flight", async () => {
    const { ableton, ws } = await startFakeAbleton({
      heartbeatInterval: 30,
      commandTimeoutMs: 5000,
    });

    // Simulates a hung Python side: this command never gets a response.
    // It will eventually reject with a DisconnectError once the test
    // closes the client in afterEach - that's expected, just silence it.
    ableton.song.get("tempo").catch(() => {});

    await new Promise((res) => setTimeout(res, 100));

    const pingWasSent = ws.sent
      .map((msg) => JSON.parse(msg))
      .some((envelope) =>
        envelope.commands.some(
          (c: any) => c.ns === "internal" && c.args?.prop === "ping",
        ),
      );

    expect(pingWasSent).toBe(true);
  });

  it("rejects with TimeoutError when a command never gets a response", async () => {
    const { ableton } = await startFakeAbleton({ commandTimeoutMs: 30 });

    await expect(ableton.song.get("tempo")).rejects.toThrow(TimeoutError);
  });

  it("rejects with a CommandError carrying errorType when the plugin reports a failure", async () => {
    const { ableton, ws } = await startFakeAbleton();

    const promise = ableton.song.get("tempo");
    await new Promise((res) => setTimeout(res, 10));

    const envelope = ws.lastEnvelope();
    ws.receive({
      event: "result",
      uuid: envelope.uuid,
      data: [{ ok: false, error: "boom", errorType: "RuntimeError" }],
    });

    await expect(promise).rejects.toBeInstanceOf(CommandError);
    await expect(promise).rejects.toMatchObject({
      message: "boom",
      errorType: "RuntimeError",
    });
  });
});
