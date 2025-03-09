/*
 * Custom Hook detects whick page (route) the reusable component is part of
 */
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const locationType = [
  'trash',
  'notes',
  'notebooks',
  'homepage-note',
  'generic',
] as const;

export type locationType = (typeof locationType)[number];

export const useLocationIndicator = () => {
  const location = useLocation();
  const [locationKey, setLocationKey] = useState<locationType | null>(null);

  const isInCurrentPath = useCallback(
    (page: string) => location.pathname.includes(page),
    [location]
  );

  useEffect(() => {
    if (isInCurrentPath('trash')) {
      setLocationKey('trash');
    } else if (isInCurrentPath('active')) {
      setLocationKey('notes');
    } else if (isInCurrentPath('/note/')) {
      setLocationKey('homepage-note');
    } else {
      setLocationKey(null);
    }
  }, []);

  return { isInCurrentPath, locationKey };
};
