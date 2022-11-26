import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addNewTaskAPI } from '../../../features/board/boardAPI';
import { TaskDTO } from '../../../types/task';
import { TaskListDetailDTO } from '../../../types/taskList';
import { listAPI } from '../../../utils/axios';
import styles from './list-card.module.css';
import Tasks from './tasks';

interface ListCardProps {
  index: number;
}

function ListCard({ index }: ListCardProps) {
  const { id: listId, title } = useAppSelector((state) => state.board.lists[index]);
  const [titleInput, setTitleInput] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => setTitleInput(title), [title]);

  async function handleUpdateListTitle() {
    try {
      const res: AxiosResponse<TaskListDetailDTO> = await listAPI().put('/', {
        id: listId,
        title: titleInput,
      });
      dispatch({ type: 'board/updateListTitle', payload: res.data });
    } catch (e: any) {
      alert(e.toString());
    }
  }

  async function handleAddNewTask() {
    try {
      const data: TaskDTO = await addNewTaskAPI(listId);
      dispatch({ type: 'board/addTask', payload: { listIndex: index, data } });
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <li className={styles.list}>
      <div className={styles.list_header}>
        <input
          className={styles.title_input}
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          onBlur={() => handleUpdateListTitle()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
          spellCheck="false"
        />
        <button>{`>`}</button> {/* TODO */}
      </div>

      <Tasks listIndex={index} />

      <button onClick={handleAddNewTask}>{'+ Add a task'}</button>
    </li>
  );
}

export default ListCard;
