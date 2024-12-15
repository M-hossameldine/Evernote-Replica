import { v4 as uuid } from "uuid";
import { NOTE_INTERFACE } from "./note-interface";

export interface TRASH_ITEM_INTERFACE {
  note: NOTE_INTERFACE;
  deleteTimestamp: string;
  id: string;
}

export const createTrashNote = (note: NOTE_INTERFACE) => {
  const deleteTimestamp = new Date().toDateString();
  return {
    note,
    deleteTimestamp,
    id: uuid(),
  };
};
