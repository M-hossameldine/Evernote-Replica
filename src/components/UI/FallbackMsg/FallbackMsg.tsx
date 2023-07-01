import React from "react";
import { IconType } from "react-icons";

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
    <div className="flex h-full flex-col justify-center items-center text-center bg-neutral-100 text-neutral-500 p-8 ">
      <fallbackData.icon className="shrink-0 text-8xl text-neutral-300 mb-12" />
      <h2 className="text-neutral-700 text-lg mb-4 ">{fallbackData.title}</h2>
      <p>{fallbackData.text}</p>
      {fallbackData.action && <fallbackData.action />}
    </div>
  );
};

export default FallbackMsg;
