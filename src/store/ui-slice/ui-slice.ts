import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface UI_STATE_INTERFACE {
  isTrashBin: boolean;
}

const initialState: UI_STATE_INTERFACE = {
  isTrashBin: false,
};

const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    activateTrashMode: (state) => {
      state.isTrashBin = true;
    },
    deactivateTrashMode: (state) => {
      state.isTrashBin = false;
    },
  },
});

export const { activateTrashMode, deactivateTrashMode } = UiSlice.actions;

export const selectTrashMode = (state: RootState) => state.ui.isTrashBin;

export default UiSlice.reducer;
