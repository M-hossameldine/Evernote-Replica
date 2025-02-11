import type { Note, TrashNote } from "modules/notes/domain/interfaces";

export const findNoteById = (notes: (Note | TrashNote)[], id: string) =>
  notes?.find((note) => note.id === id);
