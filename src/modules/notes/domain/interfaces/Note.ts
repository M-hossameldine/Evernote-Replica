import type { NoteStatus } from '~constants/AppEnums';

export type Note = {
  id: string;
  title: string;
  text: string;
  tags: string[];
  status: `${NoteStatus}`;
  /** ISO timestamps, set by the server. */
  createdAt: string;
  updatedAt: string;
  /** Set while the note is in the trash, `null` otherwise. */
  deletedAt: string | null;
};

/** Fields the user can edit. */
export type NoteContent = Pick<Note, 'title' | 'text' | 'tags'>;
