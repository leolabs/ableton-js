import { describe, it } from "vitest";
import { withAbleton } from "../util/tests";
import { GettableProperties } from "./application-view";

const gettableProps: (keyof GettableProperties)[] = [
  "browse_mode",
  "focused_document_view",
];

describe("Application", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      await Promise.all(gettableProps.map((p) => ab.application.view.get(p)));
    });
  });
});
