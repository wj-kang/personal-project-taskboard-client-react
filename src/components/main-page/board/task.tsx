import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskDTO } from '../../../types/task';
import IconPencil from '../../icons/icon-pencil';
import TaskEdit from './task-edit';
import styles from './task.module.css';

interface TaskProps {
  data: TaskDTO;
  taskIndex: number;
}

function Task({ data, taskIndex }: TaskProps) {
  const [editOn, setEditOn] = useState<boolean>(false);

  function handleCloseModal() {
    setEditOn((prev) => !prev);
  }

  return (
    <>
      {editOn && <TaskEdit data={data} handleClose={handleCloseModal} />}
      <Draggable key={data.id} draggableId={data.id} index={taskIndex}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.container}
            onClick={() => setEditOn((prev) => !prev)}
          >
            {/* <TaskLabels /> */}
            <div className={styles.task_title}>
              <div>{data.title}</div>
              <button>
                <IconPencil />
              </button>
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
}

export default Task;
