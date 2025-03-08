import { useLocationIndicator, useUpdatedState } from '~hooks';

import type { AppDispatch } from '~store';
import {
  useAppSelector,
  selectNoteEditor,
  selectNotes,
  selectTrashNotes,
} from '~store';

import { NOTESPAGE, TRASHPAGE } from '~constants/routes';

type NoteActionsDropdownItemProps = {
  text: string;
  asyncAction: (payload?: any) => (dispatch: AppDispatch) => Promise<void>;
  asyncActionArgs: object;
  operation: 'add' | 'delete' | 'update' | 'empty';
};

const NoteActionsDropdownItem = (
  props: NoteActionsDropdownItemProps
): React.ReactElement => {
  const { text, asyncAction, asyncActionArgs, operation } = props;

  const editor = useAppSelector(selectNoteEditor);
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const location = useLocationIndicator();

  const isInTrash = location.isInCurrentPath('trash');

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
    <div className="flex justify-between gap-4 py-2">
      <button
        className="flex gap-4 px-4 py-1 text-neutral-700 hover:bg-neutral-100"
        onClick={itemActionHandler}
      >
        {text}
        {/* <span className='text-neutral-500'> Delete </span> */}
      </button>
    </div>
  );
};

export default NoteActionsDropdownItem;
