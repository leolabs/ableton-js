import { describe, expect, it } from "vitest";
import { withAbleton } from "../util/tests.js";
import { BrowserItem, GettableProperties } from "./browser-item.js";

const gettableProps = Object.keys({
  children: true,
  is_device: true,
  is_folder: true,
  is_loadable: true,
  is_selected: true,
  name: true,
  source: true,
  uri: true,
} satisfies Record<keyof GettableProperties, true>) as (keyof GettableProperties)[];

describe("BrowserItem", () => {
  it("should be able to read all properties without erroring", async () => {
    await withAbleton(async (ab) => {
      const instruments = await ab.application.browser.get("instruments");
      expect(instruments.length).toBeGreaterThan(0);

      const item = instruments[0];
      expect(item).toBeInstanceOf(BrowserItem);

      await Promise.all(gettableProps.map((p) => item.get(p)));
    });
  });

  it("returns BrowserItem instances for children", async () => {
    await withAbleton(async (ab) => {
      const instruments = await ab.application.browser.get("instruments");
      const folder = instruments.find((item) => item.raw.is_folder) ?? instruments[0];

      const children = await folder.get("children");
      for (const child of children) {
        expect(child).toBeInstanceOf(BrowserItem);
      }
    });
  });
});
