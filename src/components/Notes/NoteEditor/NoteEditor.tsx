import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks';
import { selectNoteEditor } from '../../../store/noteEditor-slice/noteEditor-slice';
import { editNote } from '../../../store/notes-slice/notes-slice';
import { fillNoteEditor } from '../../../store/noteEditor-slice/noteEditor-slice';
import AutoGrowingTextArea from '../../UI/AutoGrowingTextArea/AutoGrowingTextArea';

const NoteEditor: React.FC = (props) => {
  // const [title, setTitle] = useState('');
  // const [text, setText] = useState('');
  const { title, text, activeNoteId } = useAppSelector(selectNoteEditor);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const textTextareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const titleChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const titleValue = e.currentTarget.value;
    // const titleRefValue = titleTextareaRef.current!.value;
    // const
    // console.log(titleValue);
    // setTitle(titleValue);
    const updatedTimestamp = new Date().toISOString();
    dispatch(fillNoteEditor({ title: titleValue, text, id: activeNoteId }));
    dispatch(
      editNote({ title: titleValue, text, id: activeNoteId, updatedTimestamp })
    );
  };

  const textChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const enteredText = e.currentTarget.value;
    // setText(enteredText);
  };

  return (
    <div className='grow'>
      <header className='h-[6.2rem] bg-neutral-100 border-l-[1px] border-b-[1px] border-neutral-300'></header>

      <div className='px-10 py-5'>
        <div className='mb-4'>
          <AutoGrowingTextArea
            value={title}
            placeholder='Title'
            onChange={titleChangeHandler}
            // ref={titleTextareaRef}
            className={{
              inputClasses:
                'text-neutral-700 text-3xl font-semibold placeholder:font-semibold placeholder:text-3xl',
              fallbackClasses: 'text-3xl',
            }}
          />
        </div>
        <AutoGrowingTextArea
          value={text}
          placeholder='Start writing'
          onChange={textChangeHandler}
          // ref={textTextareaRef}
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
