import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BoardListState {
  id: string;
  title: string;
}

const initialState: BoardListState[] = [];

export const boardListSlice = createSlice({
  name: 'boardlist',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<BoardListState[]>) => {
      action.payload.forEach((el) => state.push(el));
    },
    //
    add: (state, action: PayloadAction<BoardListState>) => {
      const { id, title } = action.payload;
      state.push({ id, title });
    },
    //
    updateTitle: (state, action: PayloadAction<BoardListState>) => {
      const { id, title } = action.payload;
      state.forEach((el) => (el.id === id ? (el.title = title) : null));
    },
    //
    updateOrder: (state, action: PayloadAction<{ currIdx: number; targetIdx: number }>) => {
      const { currIdx, targetIdx } = action.payload;
      reorderArray(state, currIdx, targetIdx);
    },
    //
    remove: (state, action: PayloadAction<{ id: string }>) => {
      state.filter((el) => el.id !== action.payload.id);
    },
  },
});

export const { set, add, updateTitle, updateOrder, remove } = boardListSlice.actions;
export default boardListSlice.reducer;

function reorderArray(array: BoardListState[], idx: number, targetIdx: number): void {
  if (idx < 0 || targetIdx < 0 || idx >= array.length || targetIdx >= array.length) {
    return;
  }

  if (idx < targetIdx) {
    for (let i = idx; i < targetIdx; i++) {
      swap(i, i + 1);
    }
  } else {
    for (let i = idx; i > targetIdx; i--) {
      swap(i, i - 1);
    }
  }

  function swap(idx1: number, idx2: number) {
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  }
}
