import { v4 as uuid } from "uuid";
import { Note } from "modules/notes/domain/interfaces/Note";

export function createNote(
  title: string,
  text: string,
  createdTimestamp: string,
): Note {
  return {
    id: uuid(),
    title,
    text,
    createdTimestamp,
    updatedTimestamp: "",
  };
}

export const createTrashNote = (note: Note) => {
  const deleteTimestamp = new Date().toDateString();
  return {
    note,
    deleteTimestamp,
    id: uuid(),
  };
};
