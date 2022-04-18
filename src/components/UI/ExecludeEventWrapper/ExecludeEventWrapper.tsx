import { useRef } from 'react';

import { useOutsideListener } from '../../../hooks/use-outsideListener';

const ExecludeEventWrapper: React.FC<{ listenerHandler: () => void }> = (
  props
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideListener(wrapperRef, 'mousedown', props.listenerHandler);

  return <div ref={wrapperRef}>{props.children}</div>;
};

export default ExecludeEventWrapper;
