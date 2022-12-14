import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Board from '../components/main-page/board/board';
import Navbar from '../components/main-page/navbar/navbar';
import Sidebar from '../components/main-page/sidebar/sidebar';
import { userGetAPI } from '../features/user/userAPI';
import { getTokenFromStorage } from '../utils/axios';
import styles from './main-page.module.css';

function MainPage() {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // in case of refreshing,
    if (userId) {
      return;
    }
    (async function () {
      try {
        dispatch({ type: 'loader/on' });
        const { id, email, type, boards } = await userGetAPI(getTokenFromStorage());
        dispatch({ type: 'user/login', payload: { id, email, type } });
        dispatch({ type: 'boardlist/set', payload: boards });
        //
      } catch (e: any) {
        // 403 => send client to init page
        navigate('/', { replace: true });
      } finally {
        dispatch({ type: 'loader/off' });
      }
    })();
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.flex_container}>
        <Sidebar />
        <Board />
      </div>
    </div>
  );
}

export default MainPage;
