export type NoteTuple = [
  pitch: number,
  time: number,
  duration: number,
  velocity: number,
  muted: boolean,
];

export interface Note {
  pitch: number;
  time: number;
  duration: number;
  velocity: number;
  muted: boolean;
}

export interface NoteExtended {
  note_id: number;
  duration: number;
  mute: boolean;
  pitch: number;
  probability: number;
  release_velocity: number;
  start_time: number;
  velocity: number;
  velocity_deviation: number;
}

export const tupleToNote = (tuple: NoteTuple): Note => ({
  pitch: tuple[0],
  time: tuple[1],
  duration: tuple[2],
  velocity: tuple[3],
  muted: tuple[4],
});

export const noteToTuple = (note: Note): NoteTuple => [
  note.pitch,
  note.time,
  note.duration,
  note.velocity,
  note.muted,
];
