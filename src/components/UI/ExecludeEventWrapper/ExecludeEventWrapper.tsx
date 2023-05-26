import { useRef } from "react";

import { useOutsideListener } from "hooks";

type Props = {
  children?: React.ReactNode;
  className?: string;
  listenerHandler: () => void;
};

const ExecludeEventWrapper: React.FC<Props> = (props) => {
  const { className } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideListener(wrapperRef, "mousedown", props.listenerHandler);

  return (
    <div ref={wrapperRef} className={className}>
      {props.children}
    </div>
  );
};

export default ExecludeEventWrapper;
