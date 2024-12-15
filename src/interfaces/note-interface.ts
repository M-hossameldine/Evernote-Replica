import { v4 as uuid } from "uuid";
export interface NOTE_INTERFACE {
  id: string;
  title: string;
  text: string;
  createdTimestamp: string;
  updatedTimestamp?: string;
}

export function createNote(
  title: string,
  text: string,
  createdTimestamp: string,
): NOTE_INTERFACE {
  return {
    id: uuid(),
    title,
    text,
    createdTimestamp,
    updatedTimestamp: "",
  };
}
