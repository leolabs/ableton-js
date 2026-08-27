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

export const withAbletonClients = async (
  count: number,
  callback: (clients: Ableton[]) => Promise<void>,
) => {
  const clients: Ableton[] = [];

  try {
    for (let i = 0; i < count; i++) {
      const ab = new Ableton();
      ab.on("error", console.error);
      await ab.start(2000);
      clients.push(ab);
    }

    await callback(clients);
  } finally {
    await Promise.all(clients.map((ab) => ab.close()));
  }
};

export const withAbleton = async (callback: (ab: Ableton) => Promise<void>) => {
  await withAbletonClients(1, async ([ab]) => {
    await callback(ab);
  });
};

export const withTrack = async (
  ableton: Ableton,
  type: "audio" | "midi",
  callback: (track: Track) => Promise<void>,
) => {
  const track =
    type === "audio"
      ? await ableton.song.createAudioTrack()
      : await ableton.song.createMidiTrack();

  try {
    await callback(track);
  } finally {
    const tracks = await ableton.song.get("tracks");
    const trackIndex = tracks.findIndex((t) => t.raw.id === track.raw.id);

    if (trackIndex !== -1) {
      await ableton.song.deleteTrack(trackIndex);
    }
  }
};

export const sleep = async (timeout: number) => {
  await new Promise((res) => setTimeout(res, timeout));
};

export const callCount = (fn: ReturnType<typeof vi.fn>) => {
  return fn.mock.calls.length;
};
