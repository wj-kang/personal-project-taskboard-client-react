import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { TaskDTO } from '../../../types/task';
import { taskAPI } from '../../../utils/axios';
import Dimmer from '../../common/dimmer';
import ModalWrapper from '../../common/modal-wrapper';
import styles from './task-edit.module.css';

interface TaskEditProps {
  data: TaskDTO;
  handleClose: () => void;
}
function TaskEdit({ data, handleClose }: TaskEditProps) {
  const { id, title, description, dueDate, label, createdAt, updatedAt, listId } = data;
  const [titleInput, setTitleInput] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => setTitleInput(title), [title]);

  function handleUpdateTaskTitle() {
    try {
      dispatch({ type: 'board/updateTaskTitle', payload: { id, title: titleInput, listId } });
      taskAPI().put('/', {
        id,
        title: titleInput,
        listId,
      });
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <Dimmer>
      <ModalWrapper handleClose={handleClose}>
        <form className={styles.form}>
          <input
            className={styles.title_input}
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleUpdateTaskTitle}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            spellCheck="false"
          />
          <input type="textarea" />
          <input type="date" />
        </form>
      </ModalWrapper>
    </Dimmer>
  );
}

export default TaskEdit;
