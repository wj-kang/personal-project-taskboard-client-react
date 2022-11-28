import { TaskDTO } from './../../types/task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskListDetailDTO } from '../../types/taskList';
import { DraggableLocation } from 'react-beautiful-dnd';

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
    // ** TaskLists **
    addList: (state, action: PayloadAction<TaskListDetailDTO>) => {
      state.lists.push(action.payload);
    },
    //
    updateListTitle: (state, action: PayloadAction<TaskListDetailDTO>) => {
      const { id, title } = action.payload;
      state.lists.forEach((el) => (el.id === id ? (el.title = title) : null));
    },
    //
    removeList: (state, action: PayloadAction<{ id: string }>) => {
      state.lists.filter((el) => el.id !== action.payload.id);
    },
    // ** Tasks **
    addTask: (state, action: PayloadAction<{ listIndex: number; data: TaskDTO }>) => {
      const { listIndex, data } = action.payload;
      state.lists[listIndex].tasks.push(data);
    },
    //
    taskDrag: (state, action: PayloadAction<{ src: DraggableLocation; dest: DraggableLocation }>) => {
      const { src, dest } = action.payload;

      if (src.droppableId === dest.droppableId) {
        const tasks = state.lists[Number(src.droppableId)].tasks;
        state.lists[Number(src.droppableId)].tasks = reorderArray(tasks, src.index, dest.index);
        return;
      }

      const srcTasks = state.lists[Number(src.droppableId)].tasks;
      const destTasks = state.lists[Number(dest.droppableId)].tasks;
      const taskToMove = srcTasks[src.index];
      state.lists[Number(src.droppableId)].tasks = srcTasks.filter((t, idx) => idx !== src.index);
      state.lists[Number(dest.droppableId)].tasks = [
        ...destTasks.slice(0, dest.index),
        taskToMove,
        ...destTasks.slice(dest.index),
      ];
    },
  },
});

export const { setBoard, addList, updateListTitle, removeList, taskDrag } = boardListSlice.actions;
export default boardListSlice.reducer;

function reorderArray(array: any[], idx: number, targetIdx: number): any[] {
  if (idx < 0 || targetIdx < 0 || idx >= array.length || targetIdx >= array.length) {
    return [];
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

  return array;

  function swap(idx1: number, idx2: number) {
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  }
}
