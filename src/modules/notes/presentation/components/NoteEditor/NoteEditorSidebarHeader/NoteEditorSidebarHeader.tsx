import { useLocationIndicator } from 'hooks';

import type { IconType } from 'react-icons';
import type { Note, TrashNote } from 'modules/notes/domain/interfaces';

import NoteListingOptions from '../../NoteListingOperations/NoteListingOptions';
import EmptyTrashButton from './EmptyTrashButton';

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
  const location = useLocationIndicator();

  const { notes, headerData } = props;
  const notesNumber = notes.length;

  return (
    <div className="border-b-[1px] border-b-neutral-300 p-4 pl-5 pt-5 shadow-sm">
      <div className="flex items-center gap-1 pb-3 text-neutral-700">
        <headerData.icon size="18" className="shrink-0" />
        <h2 className="text-xl">{headerData.title}</h2>
        {location.isInCurrentPath('trash') && <EmptyTrashButton />}
      </div>

      <div className="flex items-center justify-between text-neutral-500">
        <p className="text-sm">{notesNumber} notes</p>
        <NoteListingOptions />
      </div>
    </div>
  );
};

export default NoteEditorSidebarHeader;
