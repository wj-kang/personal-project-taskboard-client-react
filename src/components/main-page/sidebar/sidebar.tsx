import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { fetchBoardById } from '../../../features/board/boardAPI';
import { addNewBoardAPI, updateBoardOrderAPI } from '../../../features/boardList/boardListAPI';
import { BoardBaseDTO, BoardDetailDTO } from '../../../types/board';
import SidebarListItem from './sidebar-list-item';
import styles from './sidebar.module.css';

function Sidebar() {
  const { selectedIdx, boards } = useAppSelector((state) => state.boardlist);
  const dispatch = useAppDispatch();

  async function handleAddNewBoard(): Promise<void> {
    try {
      dispatch({ type: 'loader/on' });
      const data: BoardBaseDTO = await addNewBoardAPI();
      dispatch({ type: 'boardlist/add', payload: data });
    } catch (e: any) {
      alert(e.toString());
    } finally {
      dispatch({ type: 'loader/off' });
    }
  }

  function handleSelectBoard(boardIdx: number): void {
    dispatch({ type: 'boardlist/setSelectedIdx', payload: boardIdx });
  }

  // When selected idx changes, fetching board data
  useEffect(() => {
    if (!boards || boards.length < 1 || selectedIdx === -1) {
      return;
    }
    (async function () {
      try {
        dispatch({ type: 'loader/on' });
        const data: BoardDetailDTO = await fetchBoardById(boards[selectedIdx].id);
        dispatch({ type: 'board/setBoard', payload: data });
      } catch (e: any) {
        alert(e.toString());
      } finally {
        dispatch({ type: 'loader/off' });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIdx]);

  async function handleDragEnd(result: DropResult) {
    const { source: src, destination: dest } = result;
    if (!dest) {
      return;
    }

    try {
      dispatch({ type: 'boardlist/boardListDrag', payload: { src, dest } });
      if (src.index < selectedIdx) {
        if (dest.index >= selectedIdx) {
          dispatch({ type: 'boardlist/setSelectedIdx', payload: selectedIdx - 1 });
        }
      } else if (src.index > selectedIdx) {
        if (dest.index <= selectedIdx) {
          dispatch({ type: 'boardlist/setSelectedIdx', payload: selectedIdx + 1 });
        }
      } else {
        dispatch({ type: 'boardlist/setSelectedIdx', payload: dest.index });
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
                  isSelected={idx === selectedIdx}
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
