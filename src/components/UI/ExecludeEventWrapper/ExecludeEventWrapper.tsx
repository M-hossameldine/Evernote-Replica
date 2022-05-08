import { useRef } from 'react';

import { useOutsideListener } from '../../../hooks/use-outsideListener';

type Props = {
  children?: React.ReactNode;
  listenerHandler: () => void;
  className?: string;
};

const ExecludeEventWrapper: React.FC<Props> = (props) => {
  const { children, listenerHandler, className } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideListener(wrapperRef, 'mousedown', props.listenerHandler);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default ExecludeEventWrapper;
