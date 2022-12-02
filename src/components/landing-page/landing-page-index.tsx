import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './landing-page-index.module.css';
import { useAppDispatch } from '../../app/hooks';
import { userGuestAPI } from '../../features/user/userAPI';

function LandingPageIndex() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleGuestEnter() {
    try {
      const { id, email, type, boards } = await userGuestAPI();
      dispatch({ type: 'user/login', payload: { id, email, type } });
      dispatch({ type: 'boardlist/set', payload: boards });

      navigate('/main');
      //
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📋 TaskBoard</h1>

      <div className={styles.btns}>
        <div className={styles.btns__row1}>
          <Button onClick={() => navigate('/login')} variant="contained">
            Sign-in
          </Button>
          <Button onClick={() => navigate('/register')} variant="contained" color="secondary">
            Register
          </Button>
        </div>
        <div className={styles.btns__row2}>
          <Button onClick={handleGuestEnter} variant="text" color="inherit">
            Guest Enter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPageIndex;
