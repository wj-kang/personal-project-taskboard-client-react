import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  addNewTaskAPI,
  deleteTaskListAPI,
  updateListOrderAPI,
  updateListTitleAPI,
} from '../../../features/board/boardAPI';
import { TaskDTO } from '../../../types/task';
import IconCheck from '../../icons/icon-check';
import IconEllipsis from '../../icons/icon-ellipsis';
import IconLeftArrow from '../../icons/icon-left-arrow';
import IconRightArrow from '../../icons/icon-right-arrow';
import IconTrash from '../../icons/icon-trash';
import styles from './list-card.module.css';
import Tasks from './tasks';

interface ListCardProps {
  index: number;
}

function ListCard({ index }: ListCardProps) {
  const dispatch = useAppDispatch();
  const { id: listId, title, boardId } = useAppSelector((state) => state.board.lists[index]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<string>('');
  const [addMode, setAddMode] = useState<boolean>(false);
  const [addCardInput, setAddCardInput] = useState<string>('');

  const addCardInputRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);

  useEffect(() => setTitleInput(title), [title]);

  function toggleEditMode(): void {
    setEditMode((prev) => !prev);
    setAddMode(false);
  }

  function toggleAddMode(): void {
    setAddMode((prev) => !prev);
    setAddCardInput('');
  }

  useEffect(() => {
    // addMode on => focus to the input element
    if (addMode) {
      addCardInputRef.current?.focus();
    }
  }, [addMode]);

  async function handleUpdateListTitle() {
    try {
      dispatch({ type: 'board/updateListTitle', payload: { id: listId, title } });
      await updateListTitleAPI(listId, titleInput);
    } catch (e: any) {
      alert(e.toString());
    }
  }

  async function handleAddNewTask() {
    try {
      const data: TaskDTO = await addNewTaskAPI(listId, addCardInput);
      dispatch({ type: 'board/addTask', payload: { listIndex: index, data } });
    } catch (e: any) {
      alert(e.toString());
    } finally {
      toggleAddMode();
    }
  }

  async function handleClickDeleteList() {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Delete Card')) {
        await deleteTaskListAPI(listId);
        dispatch({ type: 'board/removeList', payload: listId });
      }
    } catch (e: any) {
      alert(e.toString());
    }
  }

  async function handleMoveList(isLeft: boolean) {
    try {
      if (isLeft) {
        dispatch({ type: 'board/moveListToLeft', payload: index });
      } else {
        dispatch({ type: 'board/moveListToRight', payload: index });
      }
      await updateListOrderAPI(boardId, index, isLeft);
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <li className={styles.list}>
      <div className={`${styles.list_dimmer} ${editMode && styles.editmode}`} onClick={toggleEditMode}></div>
      <div className={styles.list_header}>
        <input
          className={styles.title_input}
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          onBlur={() => handleUpdateListTitle()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              e.currentTarget.blur();
            }
          }}
          spellCheck="false"
        />
        {editMode ? (
          <div className={`${styles.list_header_btns} ${editMode && styles.editmode}`}>
            <button className={styles.list_header_btn} onClick={handleClickDeleteList}>
              <IconTrash />
            </button>
            <button className={styles.list_header_btn} onClick={() => handleMoveList(true)}>
              <IconLeftArrow />
            </button>{' '}
            <button className={styles.list_header_btn} onClick={() => handleMoveList(false)}>
              <IconRightArrow />
            </button>
            <button className={styles.list_header_btn} onClick={toggleEditMode}>
              <IconCheck />
            </button>
          </div>
        ) : (
          <div className={styles.list_header_btns}>
            <button className={styles.list_header_btn} onClick={toggleEditMode}>
              {/* <IconTrash /> */}
              <IconEllipsis />
            </button>
          </div>
        )}

        {/* TODO */}
      </div>

      <Tasks listIndex={index} />

      {addMode ? (
        <>
          <input
            ref={addCardInputRef}
            className={styles.add_task_input}
            type="text"
            placeholder="Enter a title for this task..."
            spellCheck="false"
            value={addCardInput}
            onChange={(e) => setAddCardInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddNewTask();
              } else if (e.key === 'Escape') {
                toggleAddMode();
              }
            }}
          />
          <div className={styles.add_task_input_btns}>
            <button className={styles.btn_add} onClick={handleAddNewTask}>
              Add Card
            </button>
            <button className={styles.btn_cancel} onClick={toggleAddMode}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button className={styles.add_task_btn} onClick={toggleAddMode}>
          {'+ Add a task'}
        </button>
      )}
    </li>
  );
}

export default ListCard;
