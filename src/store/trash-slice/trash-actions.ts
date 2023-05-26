import { Dispatch } from "redux";
import { deleteItemPermanently, restoreItem, emptyTrash } from "./trash-slice";

import { TRASH_ITEM_INTERFACE } from "interfaces";

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

export const emptyTrashAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(emptyTrash());
  };
};
