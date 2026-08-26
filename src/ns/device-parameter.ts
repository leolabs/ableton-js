import { Ableton } from "../index.js";
import { Namespace } from "./index.js";

export interface GettableProperties {
  automation_state: AutomationState;
  default_value: number;
  is_enabled: boolean;
  is_quantized: boolean;
  max: number;
  min: number;
  name: string;
  original_name: string;
  state: ParameterState;
  value: number;
  value_items: string[];
}

export interface TransformedProperties {}

export interface SettableProperties {
  value: number;
}

export interface ObservableProperties {
  automation_state: AutomationState;
  name: string;
  state: ParameterState;
  value: number;
}

export interface RawDeviceParameter {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly is_quantized: boolean;
}

export type AutomationState = "none" | "playing" | "overridden";

export type ParameterState = "enabled" | "irrelevant" | "disabled";

export class DeviceParameter extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawDeviceParameter,
  ) {
    super(ableton, "device-parameter", raw.id);
  }
}
