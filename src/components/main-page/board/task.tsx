import React from 'react';
import { TaskDTO } from '../../../types/task';
import styles from './task.module.css';

interface TaskProps {
  data: TaskDTO;
}

function Task({ data }: TaskProps) {
  return (
    <li className={styles.container}>
      {/* <TaskLabels /> */}
      <div className={styles.task_title}>
        <div>{data.title}</div>
        <span>{'Edit'}</span>
      </div>
    </li>
  );
}

export default Task;
