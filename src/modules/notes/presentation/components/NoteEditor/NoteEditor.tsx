import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { showNotification, useAppDispatch } from '~store';
import { patchCachedActiveNote } from '~modules/notes/data/remote';
import {
  useNoteAutosave,
  useNoteById,
} from '~modules/notes/presentation/hooks';

import { AutoGrowingTextArea } from '~components/FormInputs';
import { NoteEditorHeader } from './NoteEditorHeader/NoteEditorHeader';

import type { Note } from '~modules/notes/domain/interfaces';

/** Shows the note from the route (`:noteId`), editable unless it is trashed. */
export const NoteEditor = () => {
  const { noteId } = useParams();
  const note = useNoteById(noteId);

  if (!note) return <div className="h-screen grow bg-white" />;

  // Keyed by id: switching notes remounts the body, which flushes pending
  // saves of the previous note and starts a fresh draft.
  return <NoteEditorBody key={note.id} note={note} />;
};

type NoteEditorBodyProps = { note: Note };

const NoteEditorBody = ({ note }: NoteEditorBodyProps) => {
  const dispatch = useAppDispatch();
  const isTrashItem = note.status === 'trash';

  // Local draft: what the user typed, not overwritten by cache updates.
  const [draft, setDraft] = useState({ title: note.title, text: note.text });
  const { scheduleSave, flush } = useNoteAutosave(note.id);

  const changeHandler =
    (field: 'title' | 'text') => (e: React.FormEvent<HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;

      setDraft(prev => ({ ...prev, [field]: value }));
      patchCachedActiveNote(dispatch, note.id, { [field]: value });
      scheduleSave({ [field]: value });
    };

  const trashNotificationHandler = () => {
    dispatch(
      showNotification({
        status: 'error',
        message: 'You can not update a note in the Trash',
      })
    );
  };

  return (
    <div className="h-screen grow bg-white">
      <NoteEditorHeader
        noteId={note.id}
        isTrashItem={isTrashItem}
        onBeforeAction={flush}
      />

      <div
        className="px-10 py-5"
        onClick={() => {
          if (isTrashItem) trashNotificationHandler();
        }}
        role="presentation"
      >
        <AutoGrowingTextArea
          className="mb-4"
          value={draft.title}
          placeholder="Title"
          onChange={changeHandler('title')}
          inputClassName={
            'text-3xl font-semibold text-neutral-700 placeholder:text-3xl placeholder:font-semibold'
          }
          autoGrowClassName="text-3xl"
          readonly={isTrashItem}
        />

        <AutoGrowingTextArea
          value={draft.text}
          placeholder={isTrashItem ? '' : 'Start writing'}
          onChange={changeHandler('text')}
          inputClassName={'text-neutral-800'}
          readonly={isTrashItem}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
