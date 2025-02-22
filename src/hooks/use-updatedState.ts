/**
 * This custom hooks provides the ability to use the updated state when the redux state slices are manipulated
 * Specially the naviagtion after updating the state successfuly
 * The typical usuage case: adding and deleting notes
 */

import { useEffect, useState } from 'react';
import type { AppDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './redux-hooks';
import type { RootState } from '../store';

interface UPDATE_DATA_INTERFACE {
  asyncAction: (
    payload?: any
  ) => (dispatch: AppDispatch, getState: () => RootState) => Promise<void>;
  route: string;
  usedIndex: number;
  watchedState: any[];
  operation: 'add' | 'delete' | 'update' | 'empty';
}

export const useUpdatedState = (updatedStateData: UPDATE_DATA_INTERFACE) => {
  const { asyncAction, route, usedIndex, watchedState, operation } =
    updatedStateData;
  const [isListEdited, setIsListEdited] = useState<{
    isEdited: boolean;
    prevNotesLength: number;
  }>({ isEdited: false, prevNotesLength: watchedState.length });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // set operations map that get the new updated list length value
  const operationMap = new Map();
  operationMap.set('add', (length: number) => length + 1);
  operationMap.set('delete', (length: number) => length - 1);
  operationMap.set('empty', () => 0);

  // execute the store action
  const dispatchActionHandler = (payload?: any) => {
    dispatch(asyncAction(payload));
    setIsListEdited({ isEdited: true, prevNotesLength: watchedState.length });
  };

  // navigate to route after the watched list successfuly
  useEffect(() => {
    if (
      isListEdited.isEdited &&
      watchedState.length ===
        operationMap.get(operation)(isListEdited.prevNotesLength) &&
      watchedState.length !== 0
    ) {
      const noteId =
        // watchedState[usedIndex] && 'id' in watchedState[usedIndex]
        usedIndex < watchedState.length - 1 // check if the last item is deleted
          ? watchedState[usedIndex]['id']
          : watchedState[watchedState.length - 1]['id'];

      navigate(`${route}/${noteId}`);
      setIsListEdited({
        isEdited: false,
        prevNotesLength: watchedState.length,
      });
    } else if (watchedState.length === 0) {
      navigate(`${route}/empty`);
      // // causes an infinity loop
      // setIsListEdited({
      //   isEdited: false,
      //   prevNotesLength: watchedState.length,
      // });
    }
  }, [isListEdited, watchedState]);

  return { dispatchActionHandler };
};
