import { describe, expect, it } from "vitest";
import { gettablePropKeys, createAbleton } from "../util/tests.js";
import { BrowserItem, GettableProperties } from "./browser-item.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  children: true,
  is_device: true,
  is_folder: true,
  is_loadable: true,
  is_selected: true,
  name: true,
  source: true,
  uri: true,
});

describe("BrowserItem", () => {
  it("should be able to read all properties without erroring", async () => {
    await using ab = await createAbleton();

    const instruments = await ab.application.browser.get("instruments");
    expect(instruments.length).toBeGreaterThan(0);

    const item = instruments[0];
    expect(item).toBeInstanceOf(BrowserItem);

    await Promise.all(gettableProps.map((p) => item.get(p)));
  });

  it("returns BrowserItem instances for children", async () => {
    await using ab = await createAbleton();

    const instruments = await ab.application.browser.get("instruments");
    const folder =
      instruments.find((item) => item.raw.is_folder) ?? instruments[0];

    const children = await folder.get("children");
    for (const child of children) {
      expect(child).toBeInstanceOf(BrowserItem);
    }
  });
});
