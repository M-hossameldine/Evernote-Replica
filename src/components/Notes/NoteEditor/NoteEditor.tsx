import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks';

import { selectNoteEditor } from '../../../store/noteEditor-slice/noteEditor-slice';
import { selectNotes } from '../../../store/notes-slice/notes-slice';
import { editNote } from '../../../store/notes-slice/notes-slice';
import { fillNoteEditor } from '../../../store/noteEditor-slice/noteEditor-slice';

import AutoGrowingTextArea from '../../UI/AutoGrowingTextArea/AutoGrowingTextArea';

const NoteEditor: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const { title, text, activeNoteId, defaultActive } =
    useAppSelector(selectNoteEditor);
  const notes = useAppSelector(selectNotes);

  let titleText = title;
  let bodyText = text;

  if (defaultActive) {
    titleText = notes[0].title;
    bodyText = notes[0].text;
  }

  // useEffect(() => {
  //   if (defaultActive && notes.length > 0) {
  //     titleText = notes[0].title;
  //     bodyText = notes[0].text;
  //   } else {
  //     titleText = title;
  //     bodyText = text;
  //   }
  // }, [defaultActive, notes]);

  const titleChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const titleValue = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    // update store states
    dispatch(fillNoteEditor({ title: titleValue, text, id: activeNoteId }));
    dispatch(
      editNote({ title: titleValue, text, id: activeNoteId, updatedTimestamp })
    );
  };

  const textChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const enteredText = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    // update store states
    dispatch(fillNoteEditor({ title, text: enteredText, id: activeNoteId }));
    dispatch(
      editNote({ title, text: enteredText, id: activeNoteId, updatedTimestamp })
    );
  };

  return (
    <div className='grow'>
      <header className='h-[6.2rem] bg-neutral-100 border-l-[1px] border-b-[1px] border-neutral-300'></header>

      <div className='px-10 py-5'>
        <div className='mb-4'>
          <AutoGrowingTextArea
            value={titleText}
            placeholder='Title'
            onChange={titleChangeHandler}
            className={{
              inputClasses:
                'text-neutral-700 text-3xl font-semibold placeholder:font-semibold placeholder:text-3xl',
              fallbackClasses: 'text-3xl',
            }}
          />
        </div>

        <AutoGrowingTextArea
          value={bodyText}
          placeholder='Start writing'
          onChange={textChangeHandler}
          className={{
            inputClasses: 'text-neutral-800 ',
            fallbackClasses: '',
          }}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
