import type { TrashNote } from '~modules/notes/domain/interfaces';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TrashSliceState {
  notes: TrashNote[];
}

const initialState: TrashSliceState = {
  notes: [
    {
      note: {
        id: '7',
        title: '1st deleted note',
        text: '1st deleted note text body',
        createdTimestamp: new Date().toISOString(),
      },
      deleteTimestamp: new Date().toISOString(),
      id: '9',
    },
    {
      note: {
        id: '8',
        title: '2nd deleted note',
        text: '2nd deleted note text body',
        createdTimestamp: new Date().toISOString(),
      },
      deleteTimestamp: new Date().toISOString(),
      id: '11',
    },
  ],
};

const TrashSlice = createSlice({
  name: 'Trash Slice',
  initialState,
  reducers: {
    deleteItemPermanently: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      state.notes = state.notes.filter(item => item.id !== itemId);
    },
    restoreItem: (
      state,
      action: PayloadAction<{ id: string; note: TrashNote }>
    ) => {
      const itemId = action.payload.id;

      state.notes = state.notes.filter(item => item.id !== itemId);
    },
    emptyTrash: state => {
      state.notes = [];
    },
  },
});

export const { deleteItemPermanently, restoreItem, emptyTrash } =
  TrashSlice.actions;

export default TrashSlice.reducer;
