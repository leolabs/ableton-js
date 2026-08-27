import { describe, it } from "vitest";
import { gettablePropKeys, createAbleton } from "../util/tests.js";
import { GettableProperties } from "./application.js";

const gettableProps = gettablePropKeys<GettableProperties>({
  average_process_usage: true,
  bugfix_version: true,
  build_id: true,
  current_dialog_button_count: true,
  current_dialog_message: true,
  major_version: true,
  minor_version: true,
  number_of_push_apps_running: true,
  open_dialog_count: true,
  peak_process_usage: true,
  unavailable_features: true,
  variant: true,
  version: true,
});

describe("Application", () => {
  it("should be able to read all properties without erroring", async () => {
    await using ab = await createAbleton();

    await Promise.all(gettableProps.map((p) => ab.application.get(p)));
  });
});
