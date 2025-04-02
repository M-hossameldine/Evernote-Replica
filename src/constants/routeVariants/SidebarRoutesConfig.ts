import { CommonRouteVariants } from './CommonRouteVariants';
import { NotesRouteVariants } from './NotesRouteVariants';

import { AiFillHome } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';

import type { NavTabRouteConfig } from 'types';

type SidebarRoutesConfigProps = {
  firstNoteId: string;
  firstTrashNoteId: string;
};

export const SidebarRoutesConfig = ({
  firstNoteId,
  firstTrashNoteId,
}: SidebarRoutesConfigProps): NavTabRouteConfig[] => [
  {
    id: CommonRouteVariants.userHomePage.id!,
    title: 'Home',
    icon: AiFillHome,
    path: CommonRouteVariants.userHomePage.pathname(),
  },
  {
    id: NotesRouteVariants.activeNotes.id!,
    title: 'Notes',
    icon: IoIosPaper,
    path: NotesRouteVariants.activeNotes.pathname(firstNoteId),
  },
  {
    id: NotesRouteVariants.trashNotes.id!,
    title: 'Trash',
    icon: FaTrash,
    path: NotesRouteVariants.trashNotes.pathname(firstTrashNoteId),
  },
];
