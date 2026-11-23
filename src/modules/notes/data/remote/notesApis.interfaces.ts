import type { Note, NoteContent } from '~modules/notes/domain/interfaces';
import type { MutationRequestParams } from '~store/Apis/appApis.interfaces';

// * Backend DTO (shape returned by the REST API)
export type NoteDto = {
  id: string;
  title: string;
  text: string;
  tags: string[];
  status: 'active' | 'trash';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type NoteIdParams = { noteId: string };

// * Add Note: POST /notes
export type AddNoteRequestPayload = Partial<NoteContent>;
export type AddNoteRequestParams = MutationRequestParams<
  Note,
  AddNoteRequestPayload
>;

// * Update Note: PATCH /notes/:id (only the fields being changed)
export type UpdateNoteRequestPayload = Partial<NoteContent>;
export type UpdateNoteRequestParams = MutationRequestParams<
  Note,
  UpdateNoteRequestPayload,
  void,
  NoteIdParams
>;

// * Move To Trash: POST /notes/:id/trash
export type MoveNoteToTrashRequestParams = MutationRequestParams<
  Note,
  void,
  void,
  NoteIdParams
>;

// * Restore From Trash: POST /notes/:id/restore
export type RestoreNoteRequestParams = MutationRequestParams<
  Note,
  void,
  void,
  NoteIdParams
>;

// * Delete Permanently: DELETE /notes/:id (trashed notes only)
export type DeleteNotePermanentlyRequestParams = MutationRequestParams<
  null,
  void,
  void,
  NoteIdParams
>;

// * Empty Trash: DELETE /notes/trash
export type EmptyTrashRequestResult = { deletedCount: number };
export type EmptyTrashRequestParams =
  MutationRequestParams<EmptyTrashRequestResult>;
