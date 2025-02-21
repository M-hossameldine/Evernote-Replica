import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface UI_STATE_INTERFACE {
  isTrashBin: boolean;
  notification: {
    status: 'success' | 'error';
    message: JSX.Element | string;
  } | null;
}

const initialState: UI_STATE_INTERFACE = {
  isTrashBin: false,
  notification: null,
};

const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        status: 'success' | 'error';
        message: JSX.Element | string;
      }>
    ) => {
      const { status, message } = action.payload;
      state.notification = { status, message };
    },
    hideNotification: state => {
      state.notification = null;
    },
    activateTrashMode: state => {
      state.isTrashBin = true;
    },
    deactivateTrashMode: state => {
      state.isTrashBin = false;
    },
  },
});

export const {
  showNotification,
  hideNotification,
  activateTrashMode,
  deactivateTrashMode,
} = UiSlice.actions;

export const selectTrashMode = (state: RootState) => state.ui.isTrashBin;
export const selectNotification = (state: RootState) => state.ui.notification;

export default UiSlice.reducer;
