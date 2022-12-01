import { DraggableLocation } from 'react-beautiful-dnd';
import { BoardBaseDTO } from './../../types/board';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BoardBaseDTO[] = [];

export const boardListSlice = createSlice({
  name: 'boardlist',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<BoardBaseDTO[]>) => {
      return action.payload;
    },
    //
    add: (state, action: PayloadAction<BoardBaseDTO>) => {
      state.push(action.payload);
    },
    //
    updateTitle: (state, action: PayloadAction<BoardBaseDTO>) => {
      const { id, title } = action.payload;
      state.forEach((el) => (el.id === id ? (el.title = title) : null));
    },
    //
    boardListDrag: (state, action: PayloadAction<{ src: DraggableLocation; dest: DraggableLocation }>) => {
      const { src, dest } = action.payload;
      reorderArray(state, src.index, dest.index);
    },
    //
    remove: (state, action: PayloadAction<{ id: string }>) => {
      state.filter((el) => el.id !== action.payload.id);
    },
  },
});

export const { set, add, updateTitle, boardListDrag, remove } = boardListSlice.actions;
export default boardListSlice.reducer;

function reorderArray(array: BoardBaseDTO[], idx: number, targetIdx: number): void {
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
