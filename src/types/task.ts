export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  label: string[];
  listId: string;

  createdAt: Date;
  updatedAt: Date;
}