import { describe, it } from "vitest";
import { createAbleton, gettablePropKeys } from "../util/tests/index.js";
import type { GettableProperties } from "./application-view.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  browse_mode: true,
  focused_document_view: true,
});

describe("Application View", () => {
  it("should be able to read all properties without erroring", async () => {
    await using ab = await createAbleton();

    await Promise.all(gettableProps.map((p) => ab.application.view.get(p)));
  });
});
