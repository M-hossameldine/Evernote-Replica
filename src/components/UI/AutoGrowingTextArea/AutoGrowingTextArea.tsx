import React from 'react';

const AutoGrowingTextArea: React.FC<{
  value?: string;
  placeholder: string;
  className?: { inputClasses: string; fallbackClasses: string };
  disabled?: boolean;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
}> = (props) => {
  const {
    value: textValue,
    placeholder,
    className,
    disabled,
    onChange: textChangeHandler,
    onClick: inputClickedHandler,
  } = props;

  let textareaClasses = ` absolute resize-none overflow-hidden w-full h-full min-h-[2.5rem] outline-none  `;
  let fallbackClasses = className ? className.fallbackClasses : '';

  if (className) {
    textareaClasses += className.inputClasses;
  }

  return (
    <div className='relative w-full'>
      <textarea
        name='note-editor-title'
        id='note-editor-title'
        className={textareaClasses}
        placeholder={placeholder}
        value={textValue}
        disabled={disabled}
        onChange={textChangeHandler}
        onClick={inputClickedHandler}
      />

      {/*For Height Auto Growing */}
      <div
        className={`relative invisible break-words break-word-break whitespace-pre-wrap
        w-full ${fallbackClasses}`}
      >
        {textValue}t
      </div>
    </div>
  );
};

export default AutoGrowingTextArea;
