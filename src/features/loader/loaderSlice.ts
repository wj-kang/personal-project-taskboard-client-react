import { createSlice } from '@reduxjs/toolkit';

export interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    on: (state) => {
      state.isLoading = true;
    },
    off: (state) => {
      state.isLoading = false;
    },
  },
});

export const { on, off } = loaderSlice.actions;
export default loaderSlice.reducer;
