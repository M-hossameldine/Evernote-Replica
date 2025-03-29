import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

import React, { useState } from 'react';
import { useParams, useMatch } from 'react-router-dom';

import {
  editNote,
  fillNoteEditor,
  showNotification,
  useAppDispatch,
  useAppSelector,
} from '~store';
import { selectActiveNotes, selectTrashNotes } from '~modules/notes/data/local';
import { AutoGrowingTextArea } from '~components/FormInputs';

import { NoteEditorHeader } from './NoteEditorHeader/NoteEditorHeader';
import { NotesRouteVariants } from '~constants/routeVariants';

type TemporaryNoteStatus = {
  deletedNoteId: string | null;
  restoredNoteId: string | null;
};

const NoteEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectActiveNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const params = useParams();
  const matchTrashRoute = useMatch(NotesRouteVariants.trashNotes.route);

  const isInTrashPage = !!matchTrashRoute;
  const notesList: (Note | TrashNote)[] = isInTrashPage ? trashNotes : notes;

  const activeId = params.noteId as string;

  const activeNote = notesList.find(note => note.id === activeId);

  const [temporaryNoteStatus, setTemporaryNoteStatus] =
    useState<TemporaryNoteStatus>({
      deletedNoteId: null,
      restoredNoteId: null,
    });

  const isRecentlyDeleted = temporaryNoteStatus.deletedNoteId === activeId;
  const isRecentlyRestored = temporaryNoteStatus.restoredNoteId === activeId;
  const isTrashItem =
    (!isInTrashPage && isRecentlyDeleted) ||
    (isInTrashPage && !isRecentlyRestored);

  let titleText = '';
  let bodyText = '';

  if (activeNote) {
    titleText =
      'title' in activeNote ? activeNote!.title : activeNote!.note.title;
    bodyText = 'text' in activeNote ? activeNote!.text : activeNote!.note.text;
  }

  const titleChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const titleValue = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    // update store states
    dispatch(fillNoteEditor());
    dispatch(
      editNote({
        title: titleValue,
        text: bodyText,
        id: activeId,
        updatedTimestamp,
      })
    );
  };

  const textChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const enteredText = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    // update store states
    dispatch(fillNoteEditor());
    dispatch(
      editNote({
        title: titleText,
        text: enteredText,
        id: activeId,
        updatedTimestamp,
      })
    );
  };

  const trashNotificationHandler = () => {
    if (isInTrashPage) {
      dispatch(
        showNotification({
          status: 'error',
          message: 'You can not update a note in the Trash',
        })
      );
    }
  };

  const deleteNoteHandler = (id: string) => {
    setTemporaryNoteStatus(prev => ({ ...prev, deletedNoteId: id }));
  };

  const restoreNoteHandler = (id: string) => {
    setTemporaryNoteStatus(prev => ({ ...prev, restoredNoteId: id }));
  };

  return (
    <div className="h-screen grow bg-white">
      <NoteEditorHeader
        isTrashItem={isTrashItem}
        onDeleteNote={deleteNoteHandler}
        onRestoreNote={restoreNoteHandler}
      />

      <div
        className="px-10 py-5"
        onClick={trashNotificationHandler}
        role="presentation"
      >
        <div className="mb-4">
          <AutoGrowingTextArea
            value={titleText}
            placeholder="Title"
            onChange={titleChangeHandler}
            className={{
              inputClasses:
                'text-3xl font-semibold text-neutral-700 placeholder:text-3xl placeholder:font-semibold',
              fallbackClasses: 'text-3xl',
            }}
            disabled={isTrashItem}
          />
        </div>

        <AutoGrowingTextArea
          value={bodyText}
          placeholder={isTrashItem ? '' : 'Start writing'}
          onChange={textChangeHandler}
          className={{
            inputClasses: 'text-neutral-800',
            fallbackClasses: '',
          }}
          disabled={isTrashItem}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
