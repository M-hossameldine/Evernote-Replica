import { NoteStatus } from '../AppEnums';
import type { NavigationRoute } from 'types/ui';

export const NotesRouteVariants: Record<string, NavigationRoute> = {
  activeNotes: {
    route: `/notes/${NoteStatus.ACTIVE}/:noteId`,
    pathname: (noteId: string) => `/notes/${NoteStatus.ACTIVE}/${noteId}`,
    id: NoteStatus.ACTIVE,
  },
  note: {
    route: `/home/note/:noteId`,
    pathname: (noteId: string) => `/home/note/${noteId}`,
    id: 'home',
  },
  trashNotes: {
    route: `/notes/${NoteStatus.TRASH}/:noteId`,
    pathname: (noteId: string) => `/notes/${NoteStatus.TRASH}/${noteId}`,
    id: NoteStatus.TRASH,
  },
};
