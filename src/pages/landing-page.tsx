import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './landing-page.module.css';
import { useAppDispatch } from '../app/hooks';
import { getTokenFromStorage } from '../utils/axios';
import { userGetAPI } from '../features/user/userAPI';

function LandingPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if browser has a token in session-storage, try auto-login
    const token = getTokenFromStorage();
    if (!token) {
      return;
    }
    (async function () {
      try {
        dispatch({ type: 'loader/on' });
        const { id, email, type, boards } = await userGetAPI(token);
        dispatch({ type: 'user/login', payload: { id, email, type } });
        dispatch({ type: 'boardlist/set', payload: boards });
        navigate('/main', { replace: true });
        //
      } catch (e: any) {
        console.error(e);
      } finally {
        dispatch({ type: 'loader/off' });
      }
    })();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;
