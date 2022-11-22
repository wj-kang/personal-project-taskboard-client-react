import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './landing-page-index.module.css';
import { userAPI } from '../../apis';
import { AxiosResponse } from 'axios';
import { useAppDispatch } from '../../app/hooks';

interface loginResponseData {
  id: string;
  email: string;
  type: string;
  token: string;
}

function LandingPageIndex() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleGuestEnter() {
    try {
      const response: AxiosResponse<loginResponseData> = await userAPI().get('/guest');
      const { id, email, type, token } = response.data;

      dispatch({ type: 'user/login', payload: { id, email, type } });
      sessionStorage.setItem('token', token);

      navigate('/main');
      //
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <div className={styles.container}>
      <h3>Organize your tasks</h3>
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
          <Button onClick={handleGuestEnter} variant="text">
            Guest Enter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPageIndex;
