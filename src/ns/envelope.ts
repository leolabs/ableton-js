import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import type { RawClip } from "./clip.js";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter.js";

export interface EnvelopeEventControlCoefficients {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface EnvelopeEvent {
  time: number;
  value: number;
  control_coefficients: EnvelopeEventControlCoefficients;
}

export interface GettableProperties {
  parameter: RawDeviceParameter;
}

export interface TransformedProperties {
  parameter: DeviceParameter;
}

export interface SettableProperties {}

export interface ObservableProperties {}

export interface RawEnvelope {
  readonly id: string;
}

/**
 * An automation or modulation envelope in Live.
 */
export class Envelope extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(
    ableton: Ableton,
    public readonly raw: RawEnvelope,
  ) {
    super(ableton, "envelope", raw.id);

    this.transformers = {
      parameter: (param) => new DeviceParameter(ableton, param),
    };

    this.cachedProps = {
      parameter: true,
    };
  }

  /**
   * Creates a new event at the specified time with the given value and,
   * optionally, control coefficients.
   */
  createEvent(
    time: number,
    value: number,
    controlCoefficients?: EnvelopeEventControlCoefficients,
  ): Promise<void> {
    return this.sendCommand("create_event", {
      time,
      value,
      control_coefficients: controlCoefficients,
    });
  }

  /**
   * Deletes the events in the specified time range.
   */
  deleteEventsInRange(fromTime: number, toTime: number): Promise<void> {
    return this.sendCommand("delete_events_in_range", {
      from_time: fromTime,
      to_time: toTime,
    });
  }

  /**
   * Returns the events in the specified time range.
   */
  eventsInRange(fromTime: number, toTime: number): Promise<EnvelopeEvent[]> {
    return this.sendCommand("events_in_range", {
      from_time: fromTime,
      to_time: toTime,
    });
  }

  /**
   * Given a start time, a step length and a value, creates a step in the envelope.
   */
  insertStep(startTime: number, length: number, value: number): Promise<void> {
    return this.sendCommand("insert_step", {
      start_time: startTime,
      length,
      value,
    });
  }

  /**
   * Returns the parameter value at the specified time.
   */
  valueAtTime(time: number): Promise<number> {
    return this.sendCommand("value_at_time", { time });
  }
}
