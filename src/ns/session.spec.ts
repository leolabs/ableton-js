import { describe, it } from "vitest";
import { createAbleton } from "../util/tests.js";

describe("Session", () => {
  it("should work and silently fail when no session is created.", async () => {
    await using ab = await createAbleton();

    await ab.session.setSessionOffset(0, 1);
  });

  it("2x2 session ring is created and moved", async () => {
    await using ab = await createAbleton();

    await ab.session.setupSessionBox(2, 2);
    await ab.session.setSessionOffset(0, 1);
  });

  it("4x4 session ring is created and moved", async () => {
    await using ab = await createAbleton();

    await ab.session.setupSessionBox(2, 2);
    await ab.session.setupSessionBox(4, 2);
  });
});
