import { TRASH_ITEM_INTERFACE } from "interfaces";
import { Note } from "modules/notes/domain/interfaces/Note";

export const findNoteById = (
  notes: (Note | TRASH_ITEM_INTERFACE)[],
  id: string,
) => notes?.find((note) => note.id === id);
