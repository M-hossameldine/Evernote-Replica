import React from 'react';

type PropsType = {
  value?: string;
  placeholder: string;
  className?: { inputClasses: string; fallbackClasses: string };
  disabled?: boolean;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
};
const AutoGrowingTextArea = (props: PropsType): React.ReactElement => {
  const {
    value: textValue,
    placeholder,
    className,
    disabled,
    onChange: textChangeHandler,
    onClick: inputClickedHandler,
  } = props;

  let textareaClasses = ` absolute resize-none overflow-hidden w-full h-full min-h-[2.5rem] outline-none  `;
  const fallbackClasses = className ? className.fallbackClasses : '';

  if (className) {
    textareaClasses += className.inputClasses;
  }

  return (
    <div className="relative w-full">
      <textarea
        name="note-editor-title"
        id="note-editor-title"
        className={textareaClasses}
        placeholder={placeholder}
        value={textValue}
        disabled={disabled}
        onChange={textChangeHandler}
        onClick={inputClickedHandler}
      />

      {/*For Height Auto Growing */}
      <div
        className={`break-word-break invisible relative w-full whitespace-pre-wrap break-words ${fallbackClasses}`}
      >
        {textValue}t
      </div>
    </div>
  );
};

export default AutoGrowingTextArea;
