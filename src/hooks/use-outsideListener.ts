import React, { useEffect } from 'react';

// ref type: React.RefObject<ELEMENT_TYPE>
export const useOutsideListener = (
  ref: React.RefObject<HTMLElement>,
  domEvent: string,
  listenerHandler: () => void
) => {
  useEffect(() => {
    // fire event outside of element
    function clickOutsideHandler(this: HTMLElement, ev: Event) {
      if (ref.current && !ref.current.contains(ev.target as HTMLElement)) {
        listenerHandler();
      }
    }

    // bind event listener
    document.addEventListener(domEvent, clickOutsideHandler);

    return () => {
      // unbind the event listener
      document.removeEventListener(domEvent, clickOutsideHandler);
    };
  }, [ref]);
};
