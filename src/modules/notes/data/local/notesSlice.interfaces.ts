import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

export interface NotesState {
  activeNotes: Note[];
  activeNoteInEditor: Note | null;
  trashNotes: TrashNote[];
  trashNoteInEditor: TrashNote | null;
}

export type SaveActiveNotesActionPayload = Note[];

export type SaveTrashNotesActionPayload = TrashNote[];

export type SaveActiveNoteInEditorActionPayload = Note;

export type SaveTrashNoteInEditorActionPayload = TrashNote;
