import { useCallback, useEffect, useRef } from 'react';

import { useUpdateNoteMutation } from '~modules/notes/data/remote';
import type { NoteContent } from '~modules/notes/domain/interfaces';

export const AUTOSAVE_DELAY_MS = 1000;

/**
 * Debounced saving for one note. Changes are merged until the user stops
 * typing, then sent as one PATCH with only the changed fields.
 *  - saves run one after another, so an older save can't land last
 *  - pending changes are flushed when the note closes (unmount)
 *  - `flush()` lets other actions (e.g. move to trash) save first
 */
export const useNoteAutosave = (noteId: string) => {
  const [updateNote] = useUpdateNoteMutation();
  const pendingRef = useRef<Partial<NoteContent>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const queueRef = useRef<Promise<unknown>>(Promise.resolve());

  const flush = useCallback(() => {
    clearTimeout(timerRef.current);
    const changes = pendingRef.current;
    pendingRef.current = {};

    if (Object.keys(changes).length > 0) {
      queueRef.current = queueRef.current.then(() =>
        updateNote({ payload: changes, extraParams: { noteId } })
      );
    }
    return queueRef.current;
  }, [noteId, updateNote]);

  const scheduleSave = useCallback(
    (changes: Partial<NoteContent>) => {
      pendingRef.current = { ...pendingRef.current, ...changes };
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(flush, AUTOSAVE_DELAY_MS);
    },
    [flush]
  );

  // Don't lose the last keystrokes when switching notes or leaving the page.
  useEffect(() => () => void flush(), [flush]);

  return { scheduleSave, flush };
};
