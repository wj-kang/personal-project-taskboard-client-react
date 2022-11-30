import { TaskDTO } from './../../types/task';
import { BoardDetailDTO } from './../../types/board';
import { AxiosResponse } from 'axios';
import { boardAPI, listAPI, taskAPI } from '../../utils/axios';
import { DraggableLocation } from 'react-beautiful-dnd';

export async function fetchBoardById(boardId: string): Promise<BoardDetailDTO> {
  const res: AxiosResponse<BoardDetailDTO> = await boardAPI().get(`/${boardId}`);

  return res.data;
}

export async function addNewListAPI(boardId: string): Promise<BoardDetailDTO> {
  const res: AxiosResponse<BoardDetailDTO> = await listAPI().post(`/`, { boardId });

  return res.data;
}

export async function updateListTitleAPI(listId: string, title: string): Promise<void> {
  await listAPI().put('/', {
    id: listId,
    title,
  });
}

// export async function updateListOrderAPI(boardId: string, sourceIdx: number, destIdx: number): Promise<BoardDetailDTO> {
//   const res: AxiosResponse<BoardDetailDTO> = await boardAPI().put(`/`, { id: boardId, lists });

//   return res.data;
// }

export async function addNewTaskAPI(listId: string): Promise<TaskDTO> {
  const res: AxiosResponse<TaskDTO> = await taskAPI().post(`/`, { listId });

  return res.data;
}

export async function deleteTaskListAPI(listId: string): Promise<void> {
  await listAPI().delete(`/`, { data: { id: listId } });
  return;
}

export async function updateTaskTitleAPI(listId: string, taskId: string, title: string): Promise<TaskDTO> {
  const res: AxiosResponse<TaskDTO> = await taskAPI().put(`/`, { listId, id: taskId, title });

  return res.data;
}

export async function updateTaskDescriptionAPI(listId: string, taskId: string, desc: string): Promise<TaskDTO> {
  const res: AxiosResponse<TaskDTO> = await taskAPI().put(`/`, { listId, id: taskId, description: desc });

  return res.data;
}

export async function updateTaskDueDateAPI(listId: string, taskId: string, dueDate: string): Promise<TaskDTO> {
  const res: AxiosResponse<TaskDTO> = await taskAPI().put(`/`, { listId, id: taskId, dueDate });

  return res.data;
}

export async function updateTaskOrderAPI(
  boardId: string,
  src: DraggableLocation,
  dest: DraggableLocation
): Promise<void> {
  const { droppableId: srcListIdx, index: srcTaskIdx } = src;
  const { droppableId: destListIdx, index: destTaskIdx } = dest;
  const data = {
    boardId,
    srcListIdx: Number(srcListIdx),
    srcTaskIdx,
    destListIdx: Number(destListIdx),
    destTaskIdx,
  };

  await listAPI().put(`/task-drag`, data);
}
