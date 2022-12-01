import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { fetchBoardById } from '../../../features/board/boardAPI';
import { addNewBoardAPI, updateBoardOrderAPI } from '../../../features/boardList/boardListAPI';
import { BoardBaseDTO, BoardDetailDTO } from '../../../types/board';
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
    if (!boards || boards.length < 1) {
      return;
    }
    (async function () {
      const data: BoardDetailDTO = await fetchBoardById(boards[selectedBoardIdx].id);
      dispatch({ type: 'board/setBoard', payload: data });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards, selectedBoardIdx]);

  async function handleDragEnd(result: DropResult) {
    const { source: src, destination: dest } = result;
    if (!dest) {
      return;
    }

    try {
      dispatch({ type: 'boardlist/boardListDrag', payload: { src, dest } });
      if (src.index < selectedBoardIdx) {
        if (dest.index >= selectedBoardIdx) {
          setSelectedBoardIdx((prev) => prev - 1);
        }
      } else if (src.index > selectedBoardIdx) {
        if (dest.index <= selectedBoardIdx) {
          setSelectedBoardIdx((prev) => prev + 1);
        }
      } else {
        setSelectedBoardIdx(dest.index);
      }
      await updateBoardOrderAPI(src.index, dest.index);
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.flex_container}>
        <h3>Your boards</h3>
        <button onClick={handleAddNewBoard}>+</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sidebar">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
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
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </aside>
  );
}

export default Sidebar;
