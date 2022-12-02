import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addNewListAPI, updateTaskOrderAPI } from '../../../features/board/boardAPI';
import ListCard from './list-card';
import styles from './lists.module.css';

function Lists() {
  const dispatch = useAppDispatch();
  const { id: boardId, lists } = useAppSelector((state) => state.board);

  async function handleAddNewList() {
    try {
      dispatch({ type: 'loader/on' });
      const res = await addNewListAPI(boardId);
      dispatch({ type: 'board/addList', payload: res });
    } catch (e: any) {
      alert(e.toString());
    } finally {
      dispatch({ type: 'loader/off' });
    }
  }

  async function handleDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === 'lists') {
      console.log('list drag');
      // TODO
      return;
    }

    try {
      dispatch({ type: 'board/taskDrag', payload: { src: source, dest: destination } });
      await updateTaskOrderAPI(boardId, source, destination);
    } catch (e: any) {
      alert(e.toString());
    }
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
