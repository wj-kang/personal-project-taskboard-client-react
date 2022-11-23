import { Task } from './task';

export interface TaskList {
  id: string;
  title: string;
  boardId: string;
  tasks: Task[];

  createdAt: Date;
  updatedAt: Date;
}
