import { useRef } from 'react';

import { useOutsideListener } from 'hooks';

type Props = {
  children?: React.ReactNode;
  className?: string;
  listenerHandler: () => void;
};

const ExcludeEventWrapper = (props: Props): React.ReactElement => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideListener(wrapperRef, 'mousedown', props.listenerHandler);

  return (
    <div ref={wrapperRef} className={props.className}>
      {props.children}
    </div>
  );
};

export default ExcludeEventWrapper;
