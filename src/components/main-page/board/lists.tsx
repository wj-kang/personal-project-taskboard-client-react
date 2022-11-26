import React from 'react';
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

  return (
    <div className={styles.container}>
      <ul className={styles.lists}>
        {lists.map((list, idx) => (
          <ListCard index={idx} />
        ))}
      </ul>

      <button className={styles.list_add} onClick={handleAddNewList}>
        + Add another list
      </button>
    </div>
  );
}

export default Lists;
