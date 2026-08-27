import { describe, it } from "vitest";
import { gettablePropKeys, withAbleton } from "../util/tests.js";
import { GettableProperties } from "./application-view.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  browse_mode: true,
  focused_document_view: true,
});

describe("Application View", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      await Promise.all(gettableProps.map((p) => ab.application.view.get(p)));
    });
  });
});
