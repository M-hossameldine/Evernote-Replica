import { useUpdatedState } from '~hooks';

import { useAppSelector, emptyTrashAction } from '~store';
import { selectTrashNotes } from '~modules/notes/data/local';

import { NoteStatus } from '~constants';

const EmptyTrashButton: React.FC = () => {
  const trashNotes = useAppSelector(selectTrashNotes);

  const updatedTrashState = useUpdatedState({
    asyncAction: emptyTrashAction,
    status: NoteStatus.TRASH,
    usedIndex: 0,
    watchedState: trashNotes,
    operation: 'empty',
  });

  const emptyTrashHandler = () => {
    updatedTrashState.dispatchActionHandler();
  };

  return (
    <button
      className="ml-auto rounded bg-neutral-300 px-3 py-1 text-sm text-white"
      onClick={emptyTrashHandler}
    >
      Empty Trash
    </button>
  );
};

export default EmptyTrashButton;
