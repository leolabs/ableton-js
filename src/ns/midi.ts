import { Ableton } from "..";
import { Namespace } from ".";

export enum MidiCommand {
  NoteOn = 128,
  NoteOff = 144,
  AfterTouch = 160,
  ControlChange = 176,
  PatchChange = 192,
  ChannelPressure = 208,
  PitchBend = 224,
  SysExStart = 240,
  MidiTimeCodeQuarterFrame = 241,
  SongPositionPointer = 242,
  SongSelect = 243,
  TuneRequest = 246,
  SysExEnd = 247,
  TimingClock = 248,
  Start = 250,
  Continue = 251,
  Stop = 252,
  ActiveSensing = 254,
  SystemReset = 255,
}

export interface MidiMapping {
  type: "cc" | "note";
  channel: number;
  target: number;
}

export interface MidiNote {
  command: MidiCommand.NoteOn | MidiCommand.NoteOff;
  key: number;
  velocity: number;
}

export interface MidiCC {
  command: MidiCommand.ControlChange;
  controller: number;
  value: number;
}

export class MidiMessage {
  command: MidiCommand;
  parameter1: number | null = null;
  parameter2: number | null = null;

  constructor(raw: RawMidiMessage) {
    switch (raw.bytes.length) {
      case 0:
        throw "bytes missing from midi message";
      case 3:
        this.parameter1 = raw.bytes[1];
        this.parameter2 = raw.bytes[2];
        break;
      case 2:
        this.parameter1 = raw.bytes[1];
        break;
      case 1:
        break;
      default:
        throw "invalid midi message length: " + raw.bytes.length;
    }
    if (!(raw.bytes[0] in MidiCommand)) {
      throw "invalid midi command: " + raw.bytes[0];
    }
    this.command = raw.bytes[0];
  }

  toCC(): MidiCC {
    if (this.command !== MidiCommand.ControlChange) {
      throw "not a midi CC message";
    }
    return {
      command: this.command,
      controller: this.parameter1 as number,
      value: this.parameter2 as number,
    };
  }

  toNote(): MidiNote {
    if (
      this.command !== MidiCommand.NoteOn &&
      this.command !== MidiCommand.NoteOff
    ) {
      throw "not a midi note message";
    }
    return {
      command: this.command,
      key: this.parameter1 as number,
      velocity: this.parameter2 as number,
    };
  }
}

export interface RawMidiMessage {
  bytes: number[];
}

export interface GettableProperties {}

export interface TransformedProperties {
  midi: MidiMessage;
}

export interface SettableProperties {
  midi_outputs: MidiMapping[];
}

export interface ObservableProperties {
  midi: RawMidiMessage;
}

export class Midi extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "midi");

    this.transformers = {
      midi: (msg: RawMidiMessage) => new MidiMessage(msg),
    };
  }
}
