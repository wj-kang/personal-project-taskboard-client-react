import React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { deleteTaskAPI, deleteTaskListAPI } from '../../../features/board/boardAPI';
import { TaskDTO } from '../../../types/task';
import { taskAPI } from '../../../utils/axios';
import Dimmer from '../../common/dimmer';
import ModalWrapper from '../../common/modal-wrapper';
import TaskEditDescription from './task-edit-description';
import TaskEditDueDate from './task-edit-duedate';
import styles from './task-edit.module.css';

interface TaskEditProps {
  data: TaskDTO;
  handleClose: () => void;
}

function TaskEdit({ data, handleClose }: TaskEditProps) {
  const { id, title, description, dueDate, listId } = data;
  const [titleInput, setTitleInput] = useState<string>(title);
  const dispatch = useAppDispatch();

  async function handleUpdateTaskTitle() {
    try {
      dispatch({ type: 'board/updateTaskTitle', payload: { id, title: titleInput, listId } });
      await taskAPI().put('/', {
        id,
        title: titleInput,
        listId,
      });
    } catch (e: any) {
      alert(e.toString());
    }
  }

  async function handleDeleteTask() {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Delete task')) {
        dispatch({ type: 'board/deleteTask', payload: { id, listId } });
        await deleteTaskAPI(id);
      }
    } catch (e: any) {
      alert(e.toString());
      window.location.reload();
    }
  }

  return (
    <Dimmer handleClose={handleClose}>
      <ModalWrapper handleClose={handleClose}>
        <div className={styles.form}>
          <input
            className={styles.title_input}
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleUpdateTaskTitle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Escape') {
                e.currentTarget.blur();
              }
            }}
            spellCheck="false"
          />
          <TaskEditDescription listId={listId} taskId={id} description={description} />
          <TaskEditDueDate listId={listId} taskId={id} dueDate={dueDate} />
          <button className={styles.delete_btn} onClick={handleDeleteTask}>
            Delete
          </button>
        </div>
      </ModalWrapper>
    </Dimmer>
  );
}

export default TaskEdit;
