import React, { useState, useEffect } from 'react';
import { useParams, useMatch } from 'react-router-dom';

import {
  editNote,
  fillNoteEditor,
  showNotification,
  useAppDispatch,
  useAppSelector,
} from '~store';
import { selectActiveNotes, selectTrashNotes } from '~modules/notes/data/local';
import { useUpdateNoteMutation } from '~modules/notes/data/remote';

import { AutoGrowingTextArea } from '~components/FormInputs';
import { NoteEditorHeader } from './NoteEditorHeader/NoteEditorHeader';

import { NotesRouteVariants } from '~constants/routeVariants';
import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

type TemporaryNoteStatus = {
  deletedNoteId: string | null;
  restoredNoteId: string | null;
  updatedNote: Note | null;
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
      updatedNote: null,
    });

  const isRecentlyDeleted = temporaryNoteStatus.deletedNoteId === activeId;
  const isRecentlyRestored = temporaryNoteStatus.restoredNoteId === activeId;
  const isTrashItem =
    (!isInTrashPage && isRecentlyDeleted) ||
    (isInTrashPage && !isRecentlyRestored);

  const [updateNoteMutation] = useUpdateNoteMutation();

  let titleText = '';
  let bodyText = '';

  if (activeNote) {
    titleText = activeNote.title;
    bodyText = activeNote.text;
  }

  const noteContentChangeHandler = (
    e: React.FormEvent<HTMLTextAreaElement>,
    isUpdatingTitle?: boolean
  ) => {
    const enteredText = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    setTemporaryNoteStatus(prev => {
      const hasCorrectPreviousNote =
        prev.updatedNote?.id === (activeNote as Note).id;

      return {
        ...prev,
        updatedNote: {
          ...(hasCorrectPreviousNote
            ? (prev.updatedNote as Note)
            : (activeNote as Note)),
          updatedTimestamp,
          ...(isUpdatingTitle ? { title: enteredText } : { text: enteredText }),
        },
      };
    });

    // update store states
    dispatch(fillNoteEditor());
    dispatch(
      editNote({
        updatedTimestamp,
        id: activeId,
        title: isUpdatingTitle ? enteredText : titleText,
        text: isUpdatingTitle ? bodyText : enteredText,
      })
    );
  };

  useEffect(() => {
    const updateNoteHandler = async () => {
      if (temporaryNoteStatus.updatedNote) {
        await updateNoteMutation({
          payload: temporaryNoteStatus.updatedNote,
          extraParams: {
            noteId: temporaryNoteStatus.updatedNote.id,
          },
        });
      }
    };

    // * timeout to prevent spamming the server, the note will be saved after stopping typing for 2 seconds
    const updateNoteTimeout = setTimeout(() => {
      updateNoteHandler();
    }, 2000);

    return () => clearTimeout(updateNoteTimeout);
  }, [temporaryNoteStatus.updatedNote]);

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
    setTemporaryNoteStatus(prev => ({
      ...prev,
      restoredNoteId: null,
      deletedNoteId: id,
    }));
  };

  const restoreNoteHandler = (id: string) => {
    setTemporaryNoteStatus(prev => ({
      ...prev,
      deletedNoteId: null,
      restoredNoteId: id,
    }));
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
            onChange={e => noteContentChangeHandler(e, true)}
            inputClassName={
              'text-3xl font-semibold text-neutral-700 placeholder:text-3xl placeholder:font-semibold'
            }
            autoGrowClassName="text-3xl"
            disabled={isTrashItem}
          />
        </div>

        <AutoGrowingTextArea
          value={bodyText}
          placeholder={isTrashItem ? '' : 'Start writing'}
          onChange={e => noteContentChangeHandler(e, false)}
          inputClassName={'text-neutral-800'}
          disabled={isTrashItem}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
