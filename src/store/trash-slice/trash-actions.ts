import { Dispatch } from 'redux';
import { deleteItemPermanently } from './trash-slice';

export const deleteItemPermanentlyAction = (payload: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteItemPermanently(payload));

    // Error handling and api requests will be added
  };
};
