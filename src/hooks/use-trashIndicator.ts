/*
 * Custom Hook helps componens to detect if it's part of the trash page
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { TRASHPAGE, NOTESPAGE } from '../constants/routes';

export const useTrashIndicator = () => {
  const [isTrashBin, setIsTrashBin] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const pageType = (page: string) => location.pathname.includes(page);

    if (pageType(TRASHPAGE)) {
      setIsTrashBin('trash');
    } else if (pageType(NOTESPAGE)) {
      setIsTrashBin('notes');
    } else {
      setIsTrashBin(null);
      console.log('Page is note customized yet');
    }
  }, []);

  return isTrashBin;
};
