import React from 'react';
import type { IconType } from 'react-icons';

type PropsType = {
  fallbackData: {
    title: string;
    text: string;
    icon: IconType;
    action?: React.FC;
  };
};
const FallbackMsg = (props: PropsType): React.ReactElement => {
  const { fallbackData } = props;

  return (
    <div className="flex h-full flex-col items-center justify-center bg-neutral-100 p-8 text-center text-neutral-500">
      <fallbackData.icon className="mb-12 shrink-0 text-8xl text-neutral-300" />
      <h2 className="mb-4 text-lg text-neutral-700">{fallbackData.title}</h2>
      <p>{fallbackData.text}</p>
      {fallbackData.action && <fallbackData.action />}
    </div>
  );
};

export default FallbackMsg;
