import { Note, TrashNote } from 'modules/notes/domain/interfaces';
import type { IconType } from 'react-icons';

import NoteEditorSidebarHeader, {
  type NoteEditorSidebarHeaderProps,
} from '../NoteEditorSidebarHeader/NoteEditorSidebarHeader';
import NoteList from '../../NoteList/NoteList';
import FallbackMsg from 'components/UI/FallbackMsg/FallbackMsg';

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
  const { notes, header, fallbackData } = props;

  return (
    <div className="flex h-screen min-w-[18rem] max-w-[24rem] flex-col bg-neutral-100">
      {/* sidebar header*/}
      <NoteEditorSidebarHeader notes={notes} headerData={header} />

      {/* Sidebar note list */}
      {notes.length > 0 && <NoteList notes={notes} />}
      {notes.length === 0 && <FallbackMsg fallbackData={fallbackData} />}
    </div>
  );
};

export default NoteEditorSidebar;
