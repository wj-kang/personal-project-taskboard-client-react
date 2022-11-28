import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskDTO } from '../../../types/task';
import styles from './task.module.css';

interface TaskProps {
  data: TaskDTO;
  taskIndex: number;
}

function Task({ data, taskIndex }: TaskProps) {
  return (
    <Draggable key={data.id} draggableId={data.id} index={taskIndex}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.container}
        >
          {/* <TaskLabels /> */}
          <div className={styles.task_title}>
            <div>{data.title}</div>
            <span>{'Edit'}</span>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default Task;
