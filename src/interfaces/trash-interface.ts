import { v4 as uuid } from "uuid";
import type { Note } from "modules/notes/domain/interfaces/Note";

export interface TRASH_ITEM_INTERFACE {
  note: Note;
  deleteTimestamp: string;
  id: string;
}

export const createTrashNote = (note: Note) => {
  const deleteTimestamp = new Date().toDateString();
  return {
    note,
    deleteTimestamp,
    id: uuid(),
  };
};
