import { describe, it } from "vitest";
import { withAbleton } from "../util/tests";
import { GettableProperties } from "./application";

const gettableProps: (keyof GettableProperties)[] = [
  "major_version",
  "minor_version",
  "bugfix_version",
  "version",
  "open_dialog_count",
  "current_dialog_message",
  "current_dialog_button_count",
];

describe("Application", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      await Promise.all(gettableProps.map((p) => ab.application.get(p)));
    });
  });
});

describe("Should move the session box", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ableton) => {
      await ableton.application.setSessionBox(3, 3)
      await ableton.application.setSessionOffsets(1, 1)
    });
  });
});

