import { describe, it } from "vitest";
import { withAbleton } from "./util/tests";

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
});
