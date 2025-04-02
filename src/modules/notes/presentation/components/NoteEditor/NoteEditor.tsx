import React, { useEffect } from 'react';
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

export type TemporaryNoteStatus = {
  tempNote: Note | TrashNote | null; // * since activeNote can be undefined, at some cases this state will save its value
  isRecentlyDeleted: boolean;
  isRecentlyRestoredFromTrash: boolean;
  updatedNote: Note | TrashNote | null;
};

export type NoteEditorProps = {
  temporaryNoteStatus: TemporaryNoteStatus;
  setTemporaryNoteStatus: React.Dispatch<
    React.SetStateAction<TemporaryNoteStatus>
  >;
};

export const NoteEditor = ({
  temporaryNoteStatus,
  setTemporaryNoteStatus,
}: NoteEditorProps) => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectActiveNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const params = useParams();
  const matchTrashRoute = useMatch(NotesRouteVariants.trashNotes.route);

  const isInTrashPage = !!matchTrashRoute;

  const activeId = params.noteId as string;

  const isTrashItem =
    (!isInTrashPage && temporaryNoteStatus.isRecentlyDeleted) ||
    (isInTrashPage && !temporaryNoteStatus.isRecentlyRestoredFromTrash);

  const notesList: (Note | TrashNote)[] = isTrashItem ? trashNotes : notes;
  const activeNote = notesList.find(note => note.id === activeId);

  let titleText = '';
  let bodyText = '';

  if (temporaryNoteStatus.tempNote) {
    titleText = temporaryNoteStatus.tempNote.title;
    bodyText = temporaryNoteStatus.tempNote.text;
  }

  const [updateNoteMutation] = useUpdateNoteMutation();

  const noteContentChangeHandler = (
    e: React.FormEvent<HTMLTextAreaElement>,
    isUpdatingTitle?: boolean
  ) => {
    const enteredText = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    setTemporaryNoteStatus(prev => {
      const hasCorrectPreviousNote = prev.updatedNote?.id === activeId;

      return {
        ...prev,
        updatedNote: {
          ...(hasCorrectPreviousNote
            ? (prev.updatedNote as Note)
            : (prev.tempNote as Note)),
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

  useEffect(() => {
    // * initialize the note editor with the active note
    if (activeNote) {
      setTemporaryNoteStatus(prev => {
        const isDifferentNote = prev.tempNote?.id !== activeNote.id;

        return {
          ...prev,
          tempNote: activeNote,
          ...(isDifferentNote && {
            isRecentlyDeleted: false,
            isRecentlyRestoredFromTrash: false,
            updatedNote: null,
          }),
        };
      });
    }
  }, [activeNote]);

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

  const deleteNoteHandler = () => {
    setTemporaryNoteStatus(prev => ({
      ...prev,
      updatedNote: null,
      isRecentlyDeleted: true,
      isRecentlyRestoredFromTrash: false,
    }));
  };

  const restoreNoteHandler = () => {
    setTemporaryNoteStatus(prev => ({
      ...prev,
      updatedNote: null,
      isRecentlyDeleted: false,
      isRecentlyRestoredFromTrash: true,
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
        onClick={() => {
          if (isTrashItem) {
            trashNotificationHandler();
          }
        }}
        role="presentation"
      >
        <AutoGrowingTextArea
          className="mb-4"
          value={titleText}
          placeholder="Title"
          onChange={e => noteContentChangeHandler(e, true)}
          inputClassName={
            'text-3xl font-semibold text-neutral-700 placeholder:text-3xl placeholder:font-semibold'
          }
          autoGrowClassName="text-3xl"
          readonly={isTrashItem}
        />

        <AutoGrowingTextArea
          value={bodyText}
          placeholder={isTrashItem ? '' : 'Start writing'}
          onChange={e => noteContentChangeHandler(e, false)}
          inputClassName={'text-neutral-800'}
          readonly={isTrashItem}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
