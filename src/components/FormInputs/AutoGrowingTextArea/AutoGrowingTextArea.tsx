import React from 'react';

type PropsType = {
  value?: string;
  placeholder: string;
  className?: string;
  inputClassName?: string;
  autoGrowClassName?: string;
  disabled?: boolean;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
  readonly?: boolean;
};
export const AutoGrowingTextArea = (props: PropsType): React.ReactElement => {
  const {
    value: textValue,
    placeholder,
    className = '',
    inputClassName = '',
    autoGrowClassName = '',
    disabled,
    onChange: textChangeHandler,
    onClick: inputClickedHandler,
    readonly = false,
  } = props;

  const textareaClasses = `${inputClassName} absolute resize-none overflow-hidden w-full h-full min-h-[2.5rem] outline-none  `;

  return (
    <div className={`${className} relative w-full`}>
      <textarea
        name="note-editor-title"
        id="note-editor-title"
        className={textareaClasses}
        placeholder={placeholder}
        value={textValue}
        disabled={disabled}
        readOnly={readonly}
        onChange={textChangeHandler}
        onClick={inputClickedHandler}
      />

      {/*For Height Auto Growing */}
      <div
        className={`${autoGrowClassName} break-word-break invisible relative w-full whitespace-pre-wrap break-words`}
      >
        {textValue}t
      </div>
    </div>
  );
};

export default AutoGrowingTextArea;
