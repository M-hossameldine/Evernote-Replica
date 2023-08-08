import { NOTE_INTERFACE, TRASH_ITEM_INTERFACE } from "interfaces";

export const findNoteById = (
  notes: (NOTE_INTERFACE | TRASH_ITEM_INTERFACE)[],
  id: string
) => notes?.find((note) => note.id === id);
