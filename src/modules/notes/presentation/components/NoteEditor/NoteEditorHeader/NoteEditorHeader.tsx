import { NoteActionsDropdown } from '../NoteActions/NoteActionsDropdown';
import type { NoteActionsDropdownProps } from '../NoteActions/NoteActionsDropdown';

export const NoteEditorHeader = ({
  isTrashItem,
  onDeleteNote,
  onRestoreNote,
}: NoteActionsDropdownProps) => {
  return (
    <header className="h-[6.2rem] border-b-[1px] border-l-[1px] border-neutral-300 bg-neutral-100 px-3 py-3 text-neutral-400">
      <div className="flex items-center">
        <p>{isTrashItem ? 'Trash' : ''}</p>
        <p className="ml-auto pr-6 text-sm">Only you</p>
        <button className="mr-2 rounded bg-green-550 px-4 py-2 text-sm text-white hover:bg-green-700">
          Share
        </button>
        <NoteActionsDropdown
          isTrashItem={isTrashItem}
          onDeleteNote={onDeleteNote}
          onRestoreNote={onRestoreNote}
        />
      </div>
      <div className=""></div>
    </header>
  );
};

export default NoteEditorHeader;
