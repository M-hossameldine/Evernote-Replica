/*
 * Interface represents the needed requirement for actions that are followed by using the new updated store state
 * customized specially to be used when the notes or trashNotes are manipulated through addition or deletion.
 */

import { Dispatch } from 'redux';

export interface ACTION_ITEM_INTERFACE {
  text: string;
  asyncAction: (payload?: any) => (dispatch: Dispatch) => Promise<void>;
  asyncActionArgs: {};
  operation: 'add' | 'delete' | 'update' | 'empty';
}

export interface FUNCTION_ITEM_INTERFACE {
  text: string;
  onClick: () => void;
}
