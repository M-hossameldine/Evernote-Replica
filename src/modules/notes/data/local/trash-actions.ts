import type { TrashNote } from '~modules/notes/domain/interfaces';
import type { AppDispatch } from '~store';

import { deleteItemPermanently, emptyTrash, restoreItem } from './trash-slice';

export const deleteItemPermanentlyAction = (payload: { id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteItemPermanently(payload));

    // todo: Error handling and api requests will be added
  };
};

export const restoreItemFromTrashAction = (payload: {
  id: string;
  note: TrashNote;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(restoreItem(payload));
  };
};

export const emptyTrashAction = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(emptyTrash());
  };
};
