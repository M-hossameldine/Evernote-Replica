import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch, useLocationIndicator } from "hooks";

import {
  selectNotes,
  selectTrashNotes,
  editNote,
  fillNoteEditor,
  showNotification,
} from "store";
import { TRASH_ITEM_INTERFACE } from "interfaces";
import { Note } from "modules/notes/domain/interfaces/Note";

import { AutoGrowingTextArea } from "components";
import { NoteEditorHeader } from "./NoteEditorHeader/NoteEditorHeader";

const NoteEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const params = useParams();
  const location = useLocationIndicator();
  const [isDisabled, setIsDisabled] = useState(false); // disable editor fields in trash page

  let notesList: (Note | TRASH_ITEM_INTERFACE)[] = [...notes];

  const isInTrashPage = location.isInCurrentPath("trash");
  useEffect(() => {
    if (isInTrashPage) {
      // render trash list
      notesList = trashNotes;

      // prevent user from editing trash notes
      setIsDisabled(true);
    }
  }, []);

  if (isInTrashPage) {
    // render trash list
    notesList = trashNotes;
  }

  const activeId = params.noteId;

  const activeNote = notesList.find((note) => note.id === activeId);

  let titleText = "";
  let bodyText = "";

  if (activeNote) {
    titleText =
      "title" in activeNote ? activeNote!.title : activeNote!.note.title;
    bodyText = "text" in activeNote ? activeNote!.text : activeNote!.note.text;
  }
  // useEffect(() => {
  // }, [activeNote]);

  // if (defaultActive) {
  //   titleText = notes[0].title;
  //   bodyText = notes[0].text;
  // }

  const titleChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const titleValue = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    // update store states
    dispatch(
      fillNoteEditor({
        id: activeId!,
      }),
    );
    dispatch(
      editNote({
        title: titleValue,
        text: bodyText,
        id: activeId!,
        updatedTimestamp,
      }),
    );
  };

  const textChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const enteredText = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    // update store states
    dispatch(
      fillNoteEditor({
        id: activeId!,
      }),
    );
    dispatch(
      editNote({
        title: titleText,
        text: enteredText,
        id: activeId!,
        updatedTimestamp,
      }),
    );
  };

  const trashNotificationHandler = () => {
    if (isInTrashPage) {
      dispatch(
        showNotification({
          status: "error",
          message: "You can not update a note in the Trash",
        }),
      );
    }
  };

  return (
    <div className="h-screen grow bg-white">
      <NoteEditorHeader />

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
                "text-3xl font-semibold text-neutral-700 placeholder:text-3xl placeholder:font-semibold",
              fallbackClasses: "text-3xl",
            }}
            disabled={isDisabled}
          />
        </div>

        <AutoGrowingTextArea
          value={bodyText}
          placeholder="Start writing"
          onChange={textChangeHandler}
          className={{
            inputClasses: "text-neutral-800",
            fallbackClasses: "",
          }}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
