import type { Note } from "modules/notes/domain/interfaces/Note";

export interface TrashNote {
  note: Note;
  deleteTimestamp: string;
  id: string;
}
