import { describe, it } from "vitest";
import { gettablePropKeys, withAbleton } from "../util/tests.js";
import { GettableProperties } from "./track-view.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  is_collapsed: true,
  selected_device: true,
});

describe("Track View", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      const tracks = await ab.song.get("tracks");
      await Promise.all(gettableProps.map((p) => tracks[0].view.get(p)));
    });
  });

  it("should be able to set the device insert mode", async () => {
    await withAbleton(async (ab) => {
      const tracks = await ab.song.get("tracks");
      await tracks[0].view.set("device_insert_mode", "selected_left");
    });
  });

  it("should select the instrument device", async () => {
    await withAbleton(async (ab) => {
      const tracks = await ab.song.get("tracks");
      await tracks[0].view.selectInstrument();
    });
  });
});
