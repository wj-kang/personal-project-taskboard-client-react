import { TaskDTO } from './task';

export interface TaskListBaseDTO {
  id: string;
  title: string;
  boardId: string;
}

export interface TaskListDetailDTO extends TaskListBaseDTO {
  tasks: TaskDTO[];

  createdAt: Date;
  updatedAt: Date;
}
