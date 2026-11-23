import { useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  useActiveNotes,
  useTrashNotes,
} from '~modules/notes/presentation/hooks';

import DropdownList from '~components/Dropdown';
import SideNavTab from './SideNavTab';

import { SidebarRoutesConfig } from '~constants';

export const SideNavTabs: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { notes } = useActiveNotes();
  const { notes: trashNotes } = useTrashNotes();

  const firstNoteId = notes[0]?.id || 'empty';
  const firstTrashNoteId = trashNotes[0]?.id || 'empty';

  const isActiveTab = useCallback(
    (tabId: string) =>
      (pathname?.substr(1)?.split?.('/') ?? []).includes(tabId),
    [pathname]
  );

  const sidebarRoutes = useMemo(() => {
    return SidebarRoutesConfig({ firstNoteId, firstTrashNoteId });
  }, [firstNoteId, firstTrashNoteId]);

  return (
    <ul className="flex flex-col">
      {sidebarRoutes.map(route => (
        <SideNavTab
          key={route.title}
          tab={route}
          onClick={() => navigate(route.path)}
          isActive={isActiveTab(route.id)}
        />
      ))}
      <DropdownList />
    </ul>
  );
};

export default SideNavTabs;
