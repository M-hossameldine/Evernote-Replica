/*
 * Custom Hook detects whick page (route) the reusable component is part of
 */

import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { TRASHPAGE, NOTESPAGE, EDITORPAGE } from '../constants/routes';

export const locationType = [
  'trash',
  'notes',
  'notebooks',
  'editor',
  'generic',
] as const;

export type locationType = typeof locationType[number];

export const useLocationIndicator = () => {
  const location = useLocation();
  const [locationKey, setLocationKey] = useState<locationType | null>(null);

  const isInCurrentPath = useCallback(
    (page: string) => location.pathname.includes(page),
    [location]
  );

  useEffect(() => {
    if (isInCurrentPath(TRASHPAGE)) {
      setLocationKey('trash');
    } else if (isInCurrentPath(NOTESPAGE)) {
      setLocationKey('notes');
    } else if (isInCurrentPath(EDITORPAGE)) {
      setLocationKey('editor');
    } else {
      setLocationKey(null);
      console.log('Page is note customized yet');
    }
  }, []);

  return { isInCurrentPath, locationKey };
};
