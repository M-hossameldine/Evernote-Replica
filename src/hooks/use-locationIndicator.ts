/*
 * Custom Hook detects whick page (route) the reusable component is part of
 */

import { useEffect, useState } from 'react';
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
  const [locationKey, setLocationKey] = useState<locationType | null>(null);
  const location = useLocation();

  useEffect(() => {
    const pageType = (page: string) => location.pathname.includes(page);

    if (pageType(TRASHPAGE)) {
      setLocationKey('trash');
    } else if (pageType(NOTESPAGE)) {
      setLocationKey('notes');
    } else if (pageType(EDITORPAGE)) {
      setLocationKey('editor');
    } else {
      setLocationKey(null);
      console.log('Page is note customized yet');
    }
  }, []);

  return { locationKey };
};
