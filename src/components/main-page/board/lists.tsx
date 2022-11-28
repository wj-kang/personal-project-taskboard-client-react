import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addNewListAPI } from '../../../features/board/boardAPI';
import ListCard from './list-card';
import styles from './lists.module.css';

function Lists() {
  const dispatch = useAppDispatch();
  const { id: boardId, lists } = useAppSelector((state) => state.board);

  async function handleAddNewList() {
    const res = await addNewListAPI(boardId);
    dispatch({ type: 'board/addList', payload: res });
  }

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === 'lists') {
      console.log('list drag');
      // TODO
      return;
    }
    // TODO: api call
    dispatch({ type: 'board/taskDrag', payload: { src: source, dest: destination } });
  }

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ul className={styles.lists}>
          {lists.map((list, idx) => (
            <ListCard key={list.id} index={idx} />
          ))}
        </ul>
      </DragDropContext>

      <button className={styles.list_add} onClick={handleAddNewList}>
        + Add another list
      </button>
    </div>
  );
}

export default Lists;
