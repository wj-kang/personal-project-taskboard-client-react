import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './landing-page-index.module.css';

function LandingPageIndex() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Task Board</h1>
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
          <Button onClick={() => console.log('register')} variant="text">
            Guest Enter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPageIndex;
