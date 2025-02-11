import { AppDispatch } from "store";
import { TRASH_ITEM_INTERFACE } from "interfaces";
import { deleteItemPermanently, restoreItem, emptyTrash } from "./trash-slice";

export const deleteItemPermanentlyAction = (payload: { id: string }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteItemPermanently(payload));

    // todo: Error handling and api requests will be added
  };
};

export const restoreItemFromTrashAction = (payload: {
  id: string;
  note: TRASH_ITEM_INTERFACE;
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
