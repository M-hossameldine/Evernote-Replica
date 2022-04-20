import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';

import { TRASH_ITEM_INTERFACE } from '../../interfaces/trash-interface';

export interface TRASH_STATE_INTERFACE {
  notes: TRASH_ITEM_INTERFACE[];
}

const initialState: TRASH_STATE_INTERFACE = {
  notes: [
    {
      note: {
        id: '1',
        title: '1st deleted note',
        text: '1st deleted note text body',
        createdTimestamp: new Date().toISOString(),
      },
      deleteTimestamp: new Date().toISOString(),
    },
  ],
};

const TrashSlice = createSlice({
  name: 'Trash Slice',
  initialState,
  reducers: {
    deleteItemPermanently: (state, action: PayloadAction<string>) => {},
    restoreItem: (state, action: PayloadAction<string>) => {},
    emptyTrash: (state) => {},
  },
});

export const { deleteItemPermanently, restoreItem, emptyTrash } =
  TrashSlice.actions;

export const selectTrashNotes = (state: RootState) => state.trash.notes;

export default TrashSlice.reducer;
