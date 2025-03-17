import { EmptyState } from '~components/EmptyState';
import type { EmptyStateProps } from '~components/EmptyState';
import NoteList from '../../NoteList/NoteList';
import NoteEditorSidebarHeader, {
  type NoteEditorSidebarHeaderProps,
} from '../NoteEditorSidebarHeader/NoteEditorSidebarHeader';

import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

type NoteEditorSidebarProps = {
  notes: (Note | TrashNote)[];
  header: NoteEditorSidebarHeaderProps['headerData'];
  emptyStateProps: EmptyStateProps;
};

const NoteEditorSidebar = (
  props: NoteEditorSidebarProps
): React.ReactElement => {
  const { notes, header, emptyStateProps } = props;

  return (
    <div className="flex h-screen min-w-[18rem] max-w-[24rem] flex-col bg-neutral-100">
      {/* sidebar header*/}
      <NoteEditorSidebarHeader notes={notes} headerData={header} />

      {/* Sidebar note list */}
      {notes?.length > 0 && <NoteList notes={notes} />}
      {notes?.length === 0 && <EmptyState {...emptyStateProps} />}
    </div>
  );
};

export default NoteEditorSidebar;
