import { describe, expect, it, vi } from "vitest";
import {
  sleep,
  callCount,
  createAbleton,
  createAbletonClients,
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
    await using ab = await createAbleton();

    await Promise.all(
      Array(10000).map((d, i) =>
        ab.song.get("current_song_time").catch((e) => {
          console.error("Couldn't get", i);
          throw e;
        }),
      ),
    );
  });

  describe("Listeners", () => {
    it("should handle adding and removing event listeners as expected", async () => {
      await using ab = await createAbleton();

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

    it("should keep other local listeners when one is removed", async () => {
      await using ab = await createAbleton();

      const first = vi.fn();
      const second = vi.fn();
      await prepareSong(ab);

      const removeFirst = await ab.song.addListener("current_song_time", first);
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

    it("should only send listener updates to the client that subscribed", async () => {
      await using clients = await createAbletonClients(2);
      const [a, b] = clients;

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

    it("should deliver the same property change to each subscribed client", async () => {
      await using clients = await createAbletonClients(2);
      const [a, b] = clients;

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

    it("should not remove another client's listener", async () => {
      await using clients = await createAbletonClients(2);
      const [a, b] = clients;

      const aCallback = vi.fn();
      const bCallback = vi.fn();

      await prepareSong(a);
      const removeA = await a.song.addListener("current_song_time", aCallback);
      const removeB = await b.song.addListener("current_song_time", bCallback);

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

    it("should keep listeners on remaining clients after one disconnects", async () => {
      await using clients = await createAbletonClients(2);
      const [a, b] = clients;

      const bCallback = vi.fn();
      const bMessages = collectMessages(b);

      await prepareSong(b);
      await a.song.addListener("current_song_time", vi.fn());
      const removeB = await b.song.addListener("current_song_time", bCallback);

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

  describe("Response cache", () => {
    const CACHE_KEY = "abletonjs_cache_test";

    it("should store a response after the first cached fetch", async () => {
      await using ab = await createAbleton();

      await ab.song.setData(CACHE_KEY, { v: 1 });
      ab.cache?.clear();

      const value = await ab.song.getData(CACHE_KEY);
      expect(value).toEqual({ v: 1 });
      expect(ab.cache?.size).toBe(1);

      const entry = [...ab.cache!.values()][0];
      expect(entry?.data).toEqual({ v: 1 });
      expect(entry?.etag).toEqual(expect.any(String));
    });

    it("should return locally cached data when the server reports a cache hit", async () => {
      await using ab = await createAbleton();

      const cache = ab.cache!;
      await ab.song.setData(CACHE_KEY, "original");
      await ab.song.getData(CACHE_KEY);

      const key = [...cache.keys()][0]!;
      const entry = cache.get(key)!;
      cache.set(key, { ...entry, data: "from-local-cache" });

      expect(await ab.song.getData(CACHE_KEY)).toBe("from-local-cache");
    });

    it("should send the stored etag on subsequent cached requests", async () => {
      await using ab = await createAbleton();

      await ab.song.setData(CACHE_KEY, 42);
      await ab.song.getData(CACHE_KEY);
      const etag = [...ab.cache!.values()][0]!.etag;

      const sendRaw = vi.spyOn(ab, "sendRaw");
      await sleep(10);
      sendRaw.mockClear();

      await ab.song.getData(CACHE_KEY);

      const payload = JSON.parse(sendRaw.mock.calls[0]![0] as string);
      expect(payload.commands).toHaveLength(1);
      expect(payload.commands[0].etag).toBe(etag);
      expect(payload.commands[0].cache).toBe(true);
    });

    it("should refresh the cache when the value changes", async () => {
      await using ab = await createAbleton();

      await ab.song.setData(CACHE_KEY, "before");
      await ab.song.getData(CACHE_KEY);

      await ab.song.setData(CACHE_KEY, "after");
      const value = await ab.song.getData(CACHE_KEY);

      expect(value).toBe("after");
      expect([...ab.cache!.values()][0]?.data).toBe("after");
    });

    it("should cache getProp results when caching is requested", async () => {
      await using ab = await createAbleton();

      ab.cache?.clear();

      const tracks = await ab.getProp("song", undefined, "tracks", true);
      expect(tracks).toEqual(expect.any(Array));
      expect(ab.cache?.size).toBe(1);

      const entry = [...ab.cache!.values()][0];
      expect(entry?.data).toEqual(tracks);
      expect(entry?.etag).toEqual(expect.any(String));

      const again = await ab.getProp("song", undefined, "tracks", true);
      expect(again).toEqual(tracks);
    });
  });

  describe("Command batching", () => {
    it("should coalesce same-tick commands into one envelope", async () => {
      await using ab = await createAbleton();

      const sendRaw = vi.spyOn(ab, "sendRaw");
      await sleep(10);
      sendRaw.mockClear();

      await Promise.all([
        ab.song.get("tempo"),
        ab.song.get("is_playing"),
        ab.song.get("loop"),
      ]);

      expect(sendRaw).toHaveBeenCalledTimes(1);
      const payload = JSON.parse(sendRaw.mock.calls[0]![0] as string);
      expect(payload.uuid).toEqual(expect.any(String));
      expect(payload.commands).toHaveLength(3);
      expect(
        payload.commands.every(
          (command: { name: string }) => command.name === "get_prop",
        ),
      ).toBe(true);
    });

    it("should send sequential awaits as separate envelopes", async () => {
      await using ab = await createAbleton();

      const sendRaw = vi.spyOn(ab, "sendRaw");
      await sleep(10);
      sendRaw.mockClear();

      await ab.song.get("tempo");
      await ab.song.get("is_playing");

      expect(sendRaw).toHaveBeenCalledTimes(2);
      expect(
        JSON.parse(sendRaw.mock.calls[0]![0] as string).commands,
      ).toHaveLength(1);
      expect(
        JSON.parse(sendRaw.mock.calls[1]![0] as string).commands,
      ).toHaveLength(1);
    });

    it("should add many listeners in one envelope", async () => {
      await using ab = await createAbleton();

      const tracks = await ab.song.get("tracks");
      expect(tracks.length).toBeGreaterThanOrEqual(2);

      const sendRaw = vi.spyOn(ab, "sendRaw");
      sendRaw.mockClear();

      const targets = tracks.slice(0, 2);
      const removes = await Promise.all(
        targets.map((track) => track.addListener("name", vi.fn())),
      );

      expect(sendRaw).toHaveBeenCalledTimes(1);
      const payload = JSON.parse(sendRaw.mock.calls[0]![0] as string);
      expect(payload.commands).toHaveLength(2);
      expect(
        payload.commands.every(
          (command: { name: string; ns: string }) =>
            command.name === "add_listener" && command.ns === "track",
        ),
      ).toBe(true);

      await Promise.all(removes.map((remove) => remove()));
    });
  });
});
