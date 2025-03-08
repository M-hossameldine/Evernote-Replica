import { useRef } from 'react';

import { useOutsideClickListener } from '~hooks';

type ExcludeEventWrapperProps = {
  children?: React.ReactNode;
  className?: string;
  listenerHandler: () => void;
};

const ExcludeEventWrapper = (
  props: ExcludeEventWrapperProps
): React.ReactElement => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClickListener(wrapperRef, 'mousedown', props.listenerHandler);

  return (
    <div ref={wrapperRef} className={props.className}>
      {props.children}
    </div>
  );
};

export default ExcludeEventWrapper;
