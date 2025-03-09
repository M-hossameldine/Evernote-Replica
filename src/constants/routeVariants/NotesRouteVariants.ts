import { NoteStatus } from '../AppEnums';

export const NotesRouteVariants = {
  notes: {
    route: `/notes/${NoteStatus.ACTIVE}/:noteId`,
    pathname: (noteId: string) => `/notes/${NoteStatus.ACTIVE}/${noteId}`,
  },
  note: {
    route: `/note/${NoteStatus.ACTIVE}/:noteId`,
    pathname: (noteId: string) => `/note/${NoteStatus.ACTIVE}/${noteId}`,
  },
  trashNotes: {
    route: `/notes/${NoteStatus.TRASH}/:noteId`,
    pathname: (noteId: string) => `/notes/${NoteStatus.TRASH}/${noteId}`,
  },
};
