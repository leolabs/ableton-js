import { Ableton } from "..";
import { Namespace } from ".";

export interface GettableProperties {
  automation_state: AutomationState;
  default_value: string;
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
  id: number;
  name: string;
  value: number;
  is_quantized: boolean;
}

export enum AutomationState {
  None = "none",
  Overridden = "overridden",
  Playing = "playing",
}

export enum ParameterState {
  Disabled = "disabled",
  Enabled = "enabled",
  Irrelevant = "irrelevant",
}

export class DeviceParameter extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawDeviceParameter) {
    super(ableton, "device-parameter", raw.id);
  }
}
