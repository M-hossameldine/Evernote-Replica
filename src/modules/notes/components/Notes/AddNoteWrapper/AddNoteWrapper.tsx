import { useAppSelector, useUpdatedState } from "hooks";
import { selectNotes, sendNewNoteData } from "store";
import { NOTESPAGE } from "utils/constants";

type Props = {
  children?: React.ReactNode;
  actionPayload?: object;
  className?: string;
};

const AddNoteWrapper = (props: Props): React.ReactElement => {
  const { actionPayload, className } = props;
  const notes = useAppSelector(selectNotes);

  const notesUpdatedState = useUpdatedState({
    asyncAction: sendNewNoteData,
    route: NOTESPAGE,
    usedIndex: 0,
    watchedState: notes,
    operation: "add",
  });

  const addNoteHandler = () => {
    notesUpdatedState.dispatchActionHandler({ ...actionPayload });
  };

  return (
    <button className={className ? className : ""} onClick={addNoteHandler}>
      {props.children}
    </button>
  );
};

export default AddNoteWrapper;
