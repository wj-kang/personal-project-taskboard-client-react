import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateTaskDueDateAPI } from '../../../features/board/boardAPI';
import styles from './task-edit-duedate.module.css';

interface TaskEditDueDateProps {
  listId: string;
  taskId: string;
  dueDate: string;
}
function TaskEditDueDate({ listId, taskId, dueDate }: TaskEditDueDateProps) {
  const dispatch = useAppDispatch();

  function convertISOStringToInput(isoString: string | null): string | undefined {
    if (!isoString) {
      return undefined;
    }
    const d = new Date(isoString);
    const date = d.getUTCDate() < 10 ? `0${d.getUTCDate()}` : d.getUTCDate();
    const month = d.getUTCMonth() + 1 < 10 ? `0${d.getUTCMonth() + 1}` : d.getUTCMonth() + 1;
    return `${d.getUTCFullYear()}-${month}-${date}`;
  }

  async function handleChangeDate(e: React.ChangeEvent<HTMLInputElement>) {
    const dateISOString = new Date(e.target.value).toISOString();
    try {
      dispatch({
        type: 'board/updateTaskDueDate',
        payload: { listId, id: taskId, dueDate: dateISOString },
      });
      await updateTaskDueDateAPI(listId, taskId, dateISOString);
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <div className={styles.container}>
      <h4>Due Date</h4>
      <input type="date" onChange={handleChangeDate} value={convertISOStringToInput(dueDate)} />
    </div>
  );
}

export default TaskEditDueDate;
