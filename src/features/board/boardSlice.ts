import { TaskDTO } from './../../types/task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskListDetailDTO } from '../../types/taskList';

export interface BoardState {
  id: string;
  title: string;
  lists: TaskListDetailDTO[];
}

const initialState: BoardState = {
  id: '',
  title: '',
  lists: [],
};

export const boardListSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<BoardState>) => {
      return action.payload;
    },
    //
    updateBoardTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    //
    addList: (state, action: PayloadAction<TaskListDetailDTO>) => {
      state.lists.push(action.payload);
    },
    //
    updateListTitle: (state, action: PayloadAction<TaskListDetailDTO>) => {
      const { id, title } = action.payload;
      state.lists.forEach((el) => (el.id === id ? (el.title = title) : null));
    },
    //
    updateListOrder: (state, action: PayloadAction<{ currIdx: number; targetIdx: number }>) => {
      const { currIdx, targetIdx } = action.payload;
      reorderArray(state.lists, currIdx, targetIdx);
    },
    //
    removeList: (state, action: PayloadAction<{ id: string }>) => {
      state.lists.filter((el) => el.id !== action.payload.id);
    },
    //
    addTask: (state, action: PayloadAction<{ listIndex: number; data: TaskDTO }>) => {
      const { listIndex, data } = action.payload;
      state.lists[listIndex].tasks.push(data);
    },
  },
});

export const { setBoard, addList, updateListTitle, updateListOrder, removeList } = boardListSlice.actions;
export default boardListSlice.reducer;

function reorderArray(array: any[], idx: number, targetIdx: number): void {
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
