import { describe, expect, it, vi } from "vitest";
import {
  sleep,
  callCount,
  withAbleton,
  withAbletonClients,
} from "./util/tests.js";
import { Ableton } from "./index.js";

const PROTOCOL_EVENTS = new Set(["result", "error", "connect", "disconnect"]);

function collectMessages(ab: Ableton) {
  const messages: Array<{ event: string; uuid: string | null; data: unknown }> =
    [];
  const onMessage = (data: (typeof messages)[number]) => messages.push(data);
  ab.on("message", onMessage);

  return {
    listenerEvents: () => messages.filter((m) => !PROTOCOL_EVENTS.has(m.event)),
    stop: () => ab.off("message", onMessage),
  };
}

async function prepareSong(ab: Ableton) {
  await ab.song.stopPlaying();
  await ab.song.set("current_song_time", 0);
}

describe("AbletonJS", () => {
  it("should handle lots of concurrent requests", async () => {
    await withAbleton(async (ab) => {
      await Promise.all(
        Array(10000).map((d, i) =>
          ab.song.get("current_song_time").catch((e) => {
            console.error("Couldn't get", i);
            throw e;
          }),
        ),
      );
    });
  });

  describe("Listeners", () => {
    it("should handle adding and removing event listeners as expected", async () => {
      await withAbleton(async (ab) => {
        const callback = vi.fn();
        await prepareSong(ab);
        const remove = await ab.song.addListener("current_song_time", callback);
        expect(callback).toHaveBeenCalledTimes(0);

        await ab.song.set("current_song_time", 8);
        await sleep(50);
        expect(callback).toHaveBeenCalledWith(8);

        const callsAfterSet = callCount(callback);
        await remove();
        await ab.song.set("current_song_time", 10);
        await sleep(50);
        expect(callback).toHaveBeenCalledTimes(callsAfterSet);
      });
    });

    it("should keep other local listeners when one is removed", async () => {
      await withAbleton(async (ab) => {
        const first = vi.fn();
        const second = vi.fn();
        await prepareSong(ab);

        const removeFirst = await ab.song.addListener(
          "current_song_time",
          first,
        );
        const removeSecond = await ab.song.addListener(
          "current_song_time",
          second,
        );

        await ab.song.set("current_song_time", 4);
        await sleep(50);
        expect(first).toHaveBeenCalledWith(4);
        expect(second).toHaveBeenCalledWith(4);

        const firstCalls = callCount(first);
        const secondCalls = callCount(second);
        await removeFirst();
        await ab.song.set("current_song_time", 6);
        await sleep(50);
        expect(first).toHaveBeenCalledTimes(firstCalls);
        expect(second).toHaveBeenCalledTimes(secondCalls + 1);
        expect(second).toHaveBeenCalledWith(6);

        const secondCallsAfter = callCount(second);
        await removeSecond();
        await ab.song.set("current_song_time", 8);
        await sleep(50);
        expect(second).toHaveBeenCalledTimes(secondCallsAfter);
      });
    });

    it("should only send listener updates to the client that subscribed", async () => {
      await withAbletonClients(2, async ([a, b]) => {
        const aCallback = vi.fn();
        const bMessages = collectMessages(b);

        await prepareSong(a);
        const remove = await a.song.addListener("current_song_time", aCallback);

        await a.song.set("current_song_time", 12);
        await sleep(50);

        expect(aCallback).toHaveBeenCalledWith(12);
        expect(bMessages.listenerEvents()).toHaveLength(0);

        await remove();
        bMessages.stop();
      });
    });

    it("should deliver the same property change to each subscribed client", async () => {
      await withAbletonClients(2, async ([a, b]) => {
        const aCallback = vi.fn();
        const bCallback = vi.fn();

        await prepareSong(a);
        await a.song.addListener("current_song_time", aCallback);
        await b.song.addListener("current_song_time", bCallback);

        await a.song.set("current_song_time", 7);
        await sleep(50);

        expect(aCallback).toBeCalledTimes(1);
        expect(bCallback).toBeCalledTimes(1);
        expect(aCallback).toHaveBeenCalledWith(7);
        expect(bCallback).toHaveBeenCalledWith(7);
      });
    });

    it("should not remove another client's listener", async () => {
      await withAbletonClients(2, async ([a, b]) => {
        const aCallback = vi.fn();
        const bCallback = vi.fn();

        await prepareSong(a);
        const removeA = await a.song.addListener(
          "current_song_time",
          aCallback,
        );
        const removeB = await b.song.addListener(
          "current_song_time",
          bCallback,
        );

        await a.song.set("current_song_time", 3);
        await sleep(50);
        expect(aCallback).toHaveBeenCalledWith(3);
        expect(bCallback).toHaveBeenCalledWith(3);

        const aCalls = callCount(aCallback);
        const bCalls = callCount(bCallback);
        await removeA();
        await a.song.set("current_song_time", 5);
        await sleep(50);

        expect(aCallback).toHaveBeenCalledTimes(aCalls);
        expect(callCount(bCallback)).toBeGreaterThan(bCalls);
        expect(bCallback).toHaveBeenCalledWith(5);

        await removeB();
      });
    });

    it("should keep listeners on remaining clients after one disconnects", async () => {
      await withAbletonClients(2, async ([a, b]) => {
        const bCallback = vi.fn();
        const bMessages = collectMessages(b);

        await prepareSong(b);
        await a.song.addListener("current_song_time", vi.fn());
        const removeB = await b.song.addListener(
          "current_song_time",
          bCallback,
        );

        await a.close();
        await sleep(50);

        await b.song.set("current_song_time", 9);
        await sleep(50);

        expect(bCallback).toHaveBeenCalledWith(9);
        expect(bMessages.listenerEvents().length).toBeGreaterThanOrEqual(1);

        await removeB();
        bMessages.stop();
      });
    });
  });
});
