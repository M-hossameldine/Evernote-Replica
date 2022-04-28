import { Dispatch } from 'redux';
import { deleteItemPermanently, restoreItem } from './trash-slice';

import { TRASH_ITEM_INTERFACE } from '../../interfaces/trash-interface';

export const deleteItemPermanentlyAction = (payload: { id: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteItemPermanently(payload));

    // Error handling and api requests will be added
  };
};

export const restoreItemFromTrashAction = (payload: {
  id: string;
  note: TRASH_ITEM_INTERFACE;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(restoreItem(payload));
  };
};
