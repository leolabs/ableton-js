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
  value: string;
  value_items: string[];
}

export interface TransformedProperties {}

export interface SettableProperties {
  value: string;
}

export interface ObservableProperties {
  automation_state: AutomationState;
  name: string;
  state: ParameterState;
  value: string;
}

export interface RawDeviceParameter {
  id: string;
  name: string;
  value: string;
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
