import type { Note, TrashNote } from '~modules/notes/domain/interfaces';
import type {
  MutationRequestParams,
  QueryRequestParams,
  EndpointParamsWithAuth,
} from '~store/Apis/appApis.interfaces';
import type {
  SaveActiveNotesActionPayload,
  SaveTrashNotesActionPayload,
} from '../local';

// * Get Active Notes List
export type GetActiveNotesRequestResponse = Note[];
export type GetActiveNotesRequestResult = SaveActiveNotesActionPayload;
export type GetActiveNotesRequestParams =
  QueryRequestParams<SaveActiveNotesActionPayload>;
export type GetActiveNotesEndpointParams =
  EndpointParamsWithAuth<GetActiveNotesRequestParams>;

// * Get Trash Notes List
export type GetTrashNotesRequestResponse = TrashNote[];
export type GetTrashNotesRequestResult = SaveTrashNotesActionPayload;
export type GetTrashNotesRequestParams =
  QueryRequestParams<SaveTrashNotesActionPayload>;
export type GetTrashNotesEndpointParams =
  EndpointParamsWithAuth<GetTrashNotesRequestParams>;

// * Add New Note
export type AddNoteRequestPayload = Omit<Note, 'id'>;
export type AddNoteRequestResult = Note;

export type AddNoteRequestParams = MutationRequestParams<
  AddNoteRequestResult,
  AddNoteRequestPayload
>;
export type AddNoteEndpointParams =
  EndpointParamsWithAuth<AddNoteRequestParams>;

// * Update Note
export type UpdateNoteRequestPayload = Note;
export type UpdateNoteRequestResult = Note;
export type UpdateNoteRequestResponse = Note;

export type UpdateNoteRequestExtraParams = {
  noteId: string;
};

export type UpdateNoteRequestParams = MutationRequestParams<
  void,
  UpdateNoteRequestPayload,
  void,
  UpdateNoteRequestExtraParams
>;
export type UpdateNoteEndpointParams =
  EndpointParamsWithAuth<UpdateNoteRequestParams>;

// * Delete Note
export type DeleteNoteRequestResponse = string;
export type DeleteNoteRequestResult = DeleteNoteRequestResponse;
export type DeleteNoteRequestExtraParams = {
  noteId: string;
};

export type DeleteNoteRequestParams = MutationRequestParams<
  DeleteNoteRequestResult,
  void,
  void,
  DeleteNoteRequestExtraParams
>;
export type DeleteNoteEndpointParams =
  EndpointParamsWithAuth<DeleteNoteRequestParams>;

// * Clear Trash Notes
export type ClearTrashNotesRequestResponse = { success: boolean };
export type ClearTrashNotesRequestResult = void;
export type ClearTrashNotesRequestParams = MutationRequestParams;
export type ClearTrashNotesEndpointParams =
  EndpointParamsWithAuth<ClearTrashNotesRequestParams>;
