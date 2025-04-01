import { useMatch } from 'react-router-dom';

import NoteListingOptions from '../../NoteListingOperations/NoteListingOptions';
import EmptyTrashButton from './EmptyTrashButton';

import type { IconType } from 'react-icons';
import { NotesRouteVariants } from '~constants';

import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

export type NoteEditorSidebarHeaderProps = {
  notes: (Note | TrashNote)[];
  headerData: {
    title: string;
    icon: IconType;
  };
};

const NoteEditorSidebarHeader = (
  props: NoteEditorSidebarHeaderProps
): React.ReactElement => {
  const isInTrashNotes = useMatch(NotesRouteVariants.trashNotes.route);
  const { notes, headerData } = props;
  const notesNumber = notes?.length;

  return (
    <div className="border-b-[1px] border-b-neutral-300 p-4 pl-5 pt-5 shadow-sm">
      <div className="flex items-center gap-1 pb-3 text-neutral-700">
        <headerData.icon size="18" className="shrink-0" />
        <h2 className="text-xl">{headerData.title}</h2>
        {isInTrashNotes && <EmptyTrashButton />}
      </div>

      <div className="flex items-center justify-between text-neutral-500">
        <p className="text-sm">{notesNumber} notes</p>
        <NoteListingOptions />
      </div>
    </div>
  );
};

export default NoteEditorSidebarHeader;
