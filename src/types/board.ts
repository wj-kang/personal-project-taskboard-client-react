import { TaskList } from './taskList';

export interface BoardBaseDTO {
  id: string;
  title: string;
}

export interface BoardDetailDTO extends BoardBaseDTO {
  lists: TaskList[];
}
