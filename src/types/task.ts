export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  label: string[];
  listId: string;

  createdAt: Date;
  updatedAt: Date;
}
