import { useGetActiveNotesQuery } from '~modules/notes/data/remote';

import FallbackMsg from '~components/FallbackMsg';
import NoteList from '../../NoteList/NoteList';
import NoteEditorSidebarHeader, {
  type NoteEditorSidebarHeaderProps,
} from '../NoteEditorSidebarHeader/NoteEditorSidebarHeader';

import type { Note, TrashNote } from '~modules/notes/domain/interfaces';
import type { IconType } from 'react-icons';

type NoteEditorSidebarProps = {
  notes: (Note | TrashNote)[];
  header: NoteEditorSidebarHeaderProps['headerData'];
  fallbackData: {
    title: string;
    text: string;
    icon: IconType;
    action?: React.FC;
  };
};

const NoteEditorSidebar = (
  props: NoteEditorSidebarProps
): React.ReactElement => {
  const { header, fallbackData } = props;
  const { data: notes } = useGetActiveNotesQuery({});

  return (
    <div className="flex h-screen min-w-[18rem] max-w-[24rem] flex-col bg-neutral-100">
      {/* sidebar header*/}
      <NoteEditorSidebarHeader notes={notes} headerData={header} />

      {/* Sidebar note list */}
      {notes?.length > 0 && <NoteList notes={notes} />}
      {notes?.length === 0 && <FallbackMsg fallbackData={fallbackData} />}
    </div>
  );
};

export default NoteEditorSidebar;
