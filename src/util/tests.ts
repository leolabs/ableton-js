import { vi } from "vitest";
import { Ableton } from "../index.js";

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

export const sleep = async (timeout: number) => {
  await new Promise((res) => setTimeout(res, timeout));
};

export const callCount = (fn: ReturnType<typeof vi.fn>) => {
  return fn.mock.calls.length;
};
