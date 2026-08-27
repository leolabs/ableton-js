import { vi } from "vitest";
import { Ableton } from "../index.js";
import { Track } from "../ns/track.js";

/**
 * Exhaustive list of gettable property keys.
 * Fails typecheck if any key of `GP` is missing from `props`.
 */
export function gettablePropKeys<GP>(
  props: Record<keyof GP, true>,
): (keyof GP)[] {
  return Object.keys(props) as (keyof GP)[];
}

function withAsyncDispose<T extends object>(
  value: T,
  dispose: () => Promise<void>,
): T & AsyncDisposable {
  return Object.assign(value, {
    [Symbol.asyncDispose]: dispose,
  });
}

async function startAbleton(): Promise<Ableton> {
  const ab = new Ableton();
  ab.on("error", console.error);
  await ab.start(2000);
  return ab;
}

/** Starts an Ableton client; dispose with `await using`. */
export async function createAbleton(): Promise<Ableton & AsyncDisposable> {
  const ab = await startAbleton();
  return withAsyncDispose(ab, () => ab.close());
}

/** Starts multiple Ableton clients; dispose with `await using`. */
export async function createAbletonClients(
  count: number,
): Promise<Ableton[] & AsyncDisposable> {
  const clients: Ableton[] = [];
  try {
    for (let i = 0; i < count; i++) {
      clients.push(await startAbleton());
    }
  } catch (error) {
    await Promise.all(clients.map((ab) => ab.close()));
    throw error;
  }

  return withAsyncDispose(clients, async () => {
    await Promise.all(clients.map((ab) => ab.close()));
  });
}

/** Creates a temporary track; dispose with `await using`. */
export async function createTrack(
  ableton: Ableton,
  type: "audio" | "midi",
): Promise<Track & AsyncDisposable> {
  const track =
    type === "audio"
      ? await ableton.song.createAudioTrack()
      : await ableton.song.createMidiTrack();

  return withAsyncDispose(track, async () => {
    const tracks = await ableton.song.get("tracks");
    const trackIndex = tracks.findIndex((t) => t.raw.id === track.raw.id);
    if (trackIndex !== -1) {
      await ableton.song.deleteTrack(trackIndex);
    }
  });
}

export const sleep = async (timeout: number) => {
  await new Promise((res) => setTimeout(res, timeout));
};

export const callCount = (fn: ReturnType<typeof vi.fn>) => {
  return fn.mock.calls.length;
};
