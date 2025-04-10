import { useEffect } from 'react';

// for unit testing should only accepts dom events not any normal string

export const useEventListener = (
  event: string,
  eventCallbackFn: () => void
) => {
  useEffect(() => {
    window.addEventListener(event, eventCallbackFn);

    // cleanup fn
    return () => {
      window.removeEventListener(event, eventCallbackFn);
    };
  }, []);
};
