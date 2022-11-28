import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

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
      <Droppable droppableId={String(listIndex)}>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className={styles.list}>
            {tasks && tasks.map((task, idx) => <Task key={task.id} data={task} taskIndex={idx} />)}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default Tasks;
