import type { Note, TrashNote } from '~modules/notes/domain/interfaces';

import type { ACTION_ITEM_INTERFACE } from 'interfaces';

import { useAppSelector, useLocationIndicator, useUpdatedState } from '~hooks';

import { selectNoteEditor, selectNotes, selectTrashNotes } from '~store';

import { NOTESPAGE, TRASHPAGE } from '~constants/routes';

const SubmenuActionItem = (
  props: ACTION_ITEM_INTERFACE
): React.ReactElement => {
  const { content, asyncAction, asyncActionArgs, operation } = props;

  const editor = useAppSelector(selectNoteEditor);
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const location = useLocationIndicator();

  const isInTrash = location.isInCurrentPath('trash');

  const notesList: (Note | TrashNote)[] = isInTrash ? trashNotes : notes;

  const updatedState = useUpdatedState({
    asyncAction,
    watchedState: isInTrash ? trashNotes : notes,
    route: isInTrash ? TRASHPAGE : NOTESPAGE,
    usedIndex: editor.activeNoteIndex,
    operation,
  });

  const itemActionHandler = () => {
    updatedState.dispatchActionHandler({ ...asyncActionArgs });
  };

  return (
    <button
      className="flex w-full gap-4 px-4 py-2 font-semibold text-neutral-700 hover:bg-neutral-100"
      onClick={itemActionHandler}
    >
      {content}
    </button>
  );
};

export default SubmenuActionItem;
