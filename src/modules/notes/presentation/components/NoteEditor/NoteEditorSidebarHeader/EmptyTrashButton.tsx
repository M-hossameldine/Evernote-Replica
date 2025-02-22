import { useAppSelector, useUpdatedState } from 'hooks';
import { selectTrashNotes, emptyTrashAction } from 'store';

import { TRASHPAGE } from 'utils/constants';

const EmptyTrashButton: React.FC = () => {
  const trashNotes = useAppSelector(selectTrashNotes);

  const updatedTrashState = useUpdatedState({
    asyncAction: emptyTrashAction,
    route: TRASHPAGE,
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
