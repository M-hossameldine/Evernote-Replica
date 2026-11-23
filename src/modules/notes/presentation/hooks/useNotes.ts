import {
  useGetActiveNotesQuery,
  useGetTrashNotesQuery,
} from '~modules/notes/data/remote';
import type { Note } from '~modules/notes/domain/interfaces';

// Stable reference, so consumers don't re-render on every empty read.
const NO_NOTES: Note[] = [];

/** Active notes from the RTK Query cache (fetched once, shared by all callers). */
export const useActiveNotes = () => {
  const { data = NO_NOTES, ...rest } = useGetActiveNotesQuery();
  return { notes: data, ...rest };
};

/** Trashed notes from the RTK Query cache. */
export const useTrashNotes = () => {
  const { data = NO_NOTES, ...rest } = useGetTrashNotesQuery();
  return { notes: data, ...rest };
};

/**
 * Finds a note in either list. Its `status` tells the editor whether it is
 * editable, so a note keeps showing (read-only) right after it is trashed.
 */
export const useNoteById = (noteId: string | undefined) => {
  const { note: activeNote } = useGetActiveNotesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      note: data?.find(note => note.id === noteId),
    }),
  });
  const { note: trashNote } = useGetTrashNotesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      note: data?.find(note => note.id === noteId),
    }),
  });

  return activeNote ?? trashNote;
};
