import { describe, expect, it } from "vitest";
import { Ableton } from "../index.js";
import { Device, RawDevice } from "./device.js";
import { wrapDevice } from "./device.js";
import { isLooperDevice, LooperDevice } from "./looper-device.js";
import { isPluginDevice, PluginDevice } from "./plugin-device.js";
import { isRackDevice, RACK_CLASS_NAMES, RackDevice } from "./rack-device.js";

function raw(class_name: string): RawDevice {
  return {
    id: "live_1",
    name: "Test",
    type: "audio_effect",
    class_name,
  };
}

describe("wrapDevice", () => {
  const ableton = {} as Ableton;

  it("returns LooperDevice for Looper class_name", () => {
    const device = wrapDevice(ableton, raw("Looper"));
    expect(device).toBeInstanceOf(LooperDevice);
    expect(device).not.toBeInstanceOf(Device);
    expect(isLooperDevice(device)).toBe(true);
  });

  it("returns PluginDevice for PluginDevice class_name", () => {
    const device = wrapDevice(ableton, raw("PluginDevice"));
    expect(device).toBeInstanceOf(PluginDevice);
    expect(device).not.toBeInstanceOf(Device);
    expect(isPluginDevice(device)).toBe(true);
  });

  it.each(RACK_CLASS_NAMES)(
    "returns RackDevice for %s class_name",
    (class_name) => {
      const device = wrapDevice(ableton, raw(class_name));
      expect(device).toBeInstanceOf(RackDevice);
      expect(device).not.toBeInstanceOf(Device);
      expect(isRackDevice(device)).toBe(true);
    },
  );

  it("returns Device for other class names", () => {
    const device = wrapDevice(ableton, raw("AutoFilter"));
    expect(device).toBeInstanceOf(Device);
  });
});
