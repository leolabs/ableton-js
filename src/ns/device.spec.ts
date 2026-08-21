import { describe, expect, it } from "vitest";
import { Ableton } from "../index.js";
import { Device, DeviceType, RawDevice } from "./device.js";
import { wrapDevice } from "./device.js";
import { isLooperDevice, LooperDevice } from "./looper-device.js";

function raw(class_name: string): RawDevice {
  return {
    id: "live_1",
    name: "Test",
    type: DeviceType.AudioEffect,
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

  it("returns Device for other class names", () => {
    const device = wrapDevice(ableton, raw("AutoFilter"));
    expect(device).toBeInstanceOf(Device);
    expect(device).not.toBeInstanceOf(LooperDevice);
    expect(isLooperDevice(device)).toBe(false);
  });
});
