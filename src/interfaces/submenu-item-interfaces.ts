/*
 * Interface represents the needed requirement for actions that are followed by using the new updated store state
 * customized specially to be used when the notes or trashNotes are manipulated through addition or deletion.
 */

import { Dispatch } from 'redux';
import { RootState } from '../store';

export interface ACTION_ITEM_INTERFACE {
  id: string;
  content: string | JSX.Element;
  asyncAction: (
    payload?: any
  ) => (dispatch: Dispatch, getState: () => RootState) => Promise<void>;
  asyncActionArgs?: {};
  operation: 'add' | 'delete' | 'update' | 'empty';
}

export interface FUNCTION_ITEM_INTERFACE {
  id: string;
  content: string | JSX.Element;
  onClick: () => void;
}
