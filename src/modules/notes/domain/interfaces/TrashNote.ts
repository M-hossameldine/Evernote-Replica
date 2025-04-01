import type { Note } from '~modules/notes/domain/interfaces/Note';

export type TrashNote = Note & {
  deleteTimestamp: string;
};
