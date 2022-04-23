/**
 * This custom hooks provides the ability to use the updated state when the redux state slices are manipulated
 * Specially the naviagtion after updating the state successfuly
 * The typical usuage case: adding and deleting notes
 */
import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './redux-hooks';

interface UPDATE_DATA_INTERFACE {
  asyncAction: (payload?: any) => (dispatch: Dispatch) => Promise<void>;
  route: string;
  usedIndex: number;
  watchedState: any[];
  operation: 'add' | 'delete';
}

export const useUpdatedState = (updatedStateData: UPDATE_DATA_INTERFACE) => {
  const { asyncAction, route, usedIndex, watchedState, operation } =
    updatedStateData;
  const [isNoteAdded, setIsNoteAdded] = useState<{
    added: boolean;
    prevNotesLength: number;
  }>({ added: false, prevNotesLength: watchedState.length });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const operationMap = new Map();
  operationMap.set('add', (length: number) => length + 1);
  operationMap.set('delete', (length: number) => length - 1);

  const dispatchActionHandler = () => {
    dispatch(asyncAction());
    setIsNoteAdded({ added: true, prevNotesLength: watchedState.length });
  };

  // navigate to first note after adding the new note successfuly
  useEffect(() => {
    if (
      isNoteAdded.added &&
      watchedState.length ===
        operationMap.get(operation)(isNoteAdded.prevNotesLength)
    ) {
      const noteId =
        'id' in watchedState[usedIndex]
          ? watchedState[usedIndex]['id']
          : 'empty';
      navigate(`${route}/${noteId}`);
      setIsNoteAdded({ added: false, prevNotesLength: watchedState.length });
    }
  }, [isNoteAdded, watchedState]);

  return { dispatchActionHandler };
};
