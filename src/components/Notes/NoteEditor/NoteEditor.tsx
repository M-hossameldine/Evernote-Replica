import React, { useEffect, useState } from 'react';

import AutoGrowingTextArea from '../../UI/AutoGrowingTextArea/AutoGrowingTextArea';

const NoteEditor: React.FC = (props) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const titleChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const titleValue = e.currentTarget.value;
    // console.log(titleValue);
    setTitle(titleValue);
  };

  const textChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const enteredText = e.currentTarget.value;
    setText(enteredText);
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
