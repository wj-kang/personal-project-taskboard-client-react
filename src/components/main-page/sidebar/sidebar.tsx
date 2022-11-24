import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchBoardById } from '../../../features/board/boardAPI';
import { addNewBoardAPI } from '../../../features/boardList/boardListAPI';
import { BoardBaseDTO } from '../../../types/board';
import SidebarListItem from './sidebar-list-item';
import styles from './sidebar.module.css';

function Sidebar() {
  const boards: BoardBaseDTO[] = useAppSelector((state) => state.boardlist);
  const [selectedBoardIdx, setSelectedBoardIdx] = useState<number>(0);
  const dispatch = useAppDispatch();

  async function handleAddNewBoard(): Promise<void> {
    const data: BoardBaseDTO = await addNewBoardAPI();
    dispatch({ type: 'boardlist/add', payload: data });
  }

  function handleSelectBoard(boardIdx: number): void {
    setSelectedBoardIdx(boardIdx);
  }

  // When selected idx changes, fetching board data
  useEffect(() => {
    if (boards.length < 1) {
      return;
    }
    (async function () {
      const data = await fetchBoardById(boards[selectedBoardIdx].id);
      dispatch({ type: 'board/setBoard', payload: data });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBoardIdx]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.flex_container}>
        <h3>Your boards</h3>
        <button onClick={handleAddNewBoard}>+</button>
      </div>

      <ul>
        {boards.map((b, idx) => (
          <SidebarListItem
            key={b.id}
            id={b.id}
            idx={idx}
            title={b.title}
            handleClick={handleSelectBoard}
            isSelected={idx === selectedBoardIdx}
          />
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
