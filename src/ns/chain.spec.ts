import { describe, expect, it } from "vitest";
import { Ableton } from "../index.js";
import { Chain, RawChain } from "./chain.js";
import { DrumChain, isDrumChain, wrapChain } from "./drum-chain.js";

function rawChain(overrides: Partial<RawChain> = {}): RawChain {
  return {
    id: "live_1",
    name: "Chain",
    color: null,
    mute: false,
    solo: false,
    ...overrides,
  };
}

describe("wrapChain", () => {
  const ableton = {} as Ableton;

  it("returns Chain for regular chains", () => {
    const chain = wrapChain(ableton, rawChain({ is_drum_chain: false }));
    expect(chain).toBeInstanceOf(Chain);
    expect(isDrumChain(chain)).toBe(false);
  });

  it("returns DrumChain when is_drum_chain is true", () => {
    const chain = wrapChain(
      ableton,
      rawChain({
        is_drum_chain: true,
        choke_group: 0,
        in_note: 36,
        out_note: 36,
      }),
    );
    expect(chain).toBeInstanceOf(DrumChain);
    expect(isDrumChain(chain)).toBe(true);
  });
});
