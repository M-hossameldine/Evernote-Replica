import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdatedState } from '../../../../hooks/use-updatedState';

import { useAppSelector, useAppDispatch } from '../../../../hooks/redux-hooks';
import { selectNoteEditor } from '../../../../store/noteEditor-slice/noteEditor-slice';
import { selectNotes } from '../../../../store/notes-slice/notes-slice';
import { moveToTrash } from '../../../../store/notes-slice/notes-slice';
import { MoveToTrashAction } from '../../../../store/notes-slice/notes-actions';

import { NOTESPAGE } from '../../../../constants/routes';
import ExecludeEventWrapper from '../../../UI/ExecludeEventWrapper/ExecludeEventWrapper';
import Icons from '../../../../constants/Icons';

const { IoIosMore } = Icons;

const NoteActionsDropdown: React.FC = (props) => {
  const editor = useAppSelector(selectNoteEditor);
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const params = useParams();
  const updatedState = useUpdatedState({
    asyncAction: MoveToTrashAction,
    watchedState: notes,
    route: NOTESPAGE,
    usedIndex: editor.activeNoteIndex,
    operation: 'delete',
  });

  const deleteNoteHandler = () => {
    const selectedNote = notes.find((note) => note.id === params.noteId);
    updatedState.dispatchActionHandler({
      id: params.noteId!,
      note: selectedNote!,
    });
    // dispatch(moveToTrash({ id: params.noteId!, note: selectedNote! }));
    hideDropdonwHandler();
  };

  // dropdown visiblity handlers
  const toggleDropdonwHandler = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const hideDropdonwHandler = () => {
    setIsExpanded(false);
  };

  return (
    <ExecludeEventWrapper listenerHandler={hideDropdonwHandler}>
      <div className='relative group'>
        <button
          className='text-neutral-500 m-0 p-0'
          onClick={toggleDropdonwHandler}
        >
          <IoIosMore className='text-xl shrink-0' />
        </button>

        <div
          className={`absolute right-0 top-[150%] bg-white whitespace-nowrap shadow-even-1 rounded text-sm ${
            isExpanded ? 'scale-100' : 'scale-0'
          }`}
        >
          <div className='flex justify-between gap-4 py-2'>
            <button
              className='flex gap-4 text-neutral-700 hover:bg-neutral-100 px-4 py-1'
              onClick={deleteNoteHandler}
            >
              Move to Trash
              <span className='text-neutral-500'> Delete </span>
            </button>
          </div>
        </div>
      </div>
    </ExecludeEventWrapper>
  );
};

export default NoteActionsDropdown;
