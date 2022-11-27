import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { TaskDTO } from '../../../types/task';
import Task from './task';
import styles from './tasks.module.css';

interface TasksProps {
  listIndex: number;
}

function Tasks({ listIndex }: TasksProps) {
  const tasks: TaskDTO[] = useAppSelector((state) => state.board.lists[listIndex].tasks);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{tasks && tasks.map((task) => <Task data={task} />)}</ul>
    </div>
  );
}

export default Tasks;
