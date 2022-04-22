import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';

import {
  TRASH_ITEM_INTERFACE,
  createTrashNote,
} from '../../interfaces/trash-interface';

export interface TRASH_STATE_INTERFACE {
  notes: TRASH_ITEM_INTERFACE[];
}

const initialState: TRASH_STATE_INTERFACE = {
  notes: [
    {
      note: {
        id: '5',
        title: '1st deleted note',
        text: '1st deleted note text body',
        createdTimestamp: new Date().toISOString(),
      },
      deleteTimestamp: new Date().toISOString(),
      id: '0',
    },
    {
      note: {
        id: '6',
        title: '2nd deleted note',
        text: '2nd deleted note text body',
        createdTimestamp: new Date().toISOString(),
      },
      deleteTimestamp: new Date().toISOString(),
      id: '1',
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
