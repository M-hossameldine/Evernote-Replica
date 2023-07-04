import { useUpdatedState, useAppSelector, useLocationIndicator } from "hooks";

import {
  selectNotes,
  selectTrashNotes,
  selectNoteEditor,
  AppDispatch,
} from "store";

import { NOTESPAGE, TRASHPAGE } from "utils/constants";
import { NOTE_INTERFACE, TRASH_ITEM_INTERFACE } from "interfaces";

type NoteActionsDropdownItemProps = {
  text: string;
  asyncAction: (payload?: any) => (dispatch: AppDispatch) => Promise<void>;
  asyncActionArgs: object;
  operation: "add" | "delete" | "update" | "empty";
};

const NoteActionsDropdownItem = (
  props: NoteActionsDropdownItemProps
): React.ReactElement => {
  const { text, asyncAction, asyncActionArgs, operation } = props;

  const editor = useAppSelector(selectNoteEditor);
  const notes = useAppSelector(selectNotes);
  const trashNotes = useAppSelector(selectTrashNotes);
  const location = useLocationIndicator();

  const isInTrash = location.isInCurrentPath("trash");

  const notesList: (NOTE_INTERFACE | TRASH_ITEM_INTERFACE)[] = isInTrash
    ? trashNotes
    : notes;

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
        className="flex gap-4 text-neutral-700 hover:bg-neutral-100 px-4 py-1"
        onClick={itemActionHandler}
      >
        {text}
        {/* <span className='text-neutral-500'> Delete </span> */}
      </button>
    </div>
  );
};

export default NoteActionsDropdownItem;
