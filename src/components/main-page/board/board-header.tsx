import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { BoardDetailDTO } from '../../../types/board';
import { boardAPI } from '../../../utils/axios';

import styles from './board-header.module.css';

function BoardHeader() {
  const dispatch = useAppDispatch();
  const { id, title } = useAppSelector((state) => state.board);
  const [titleInput, setTitleInput] = useState<string>('');

  useEffect(() => {
    setTitleInput(title);
  }, [title]);

  async function handleUpdateBoardTitle() {
    try {
      const res: AxiosResponse<BoardDetailDTO> = await boardAPI().put('/', {
        id,
        title: titleInput,
      });
      dispatch({ type: 'board/updateBoardTitle', payload: res.data.title });
      dispatch({ type: 'boardlist/updateTitle', payload: res.data });
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <header>
      <input
        className={styles.title_input}
        type="text"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        onBlur={() => handleUpdateBoardTitle()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          }
        }}
        spellCheck="false"
      ></input>
    </header>
  );
}

export default BoardHeader;
