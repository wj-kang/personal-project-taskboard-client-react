import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import styles from './landing-page.module.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title} onClick={() => navigate('/')}>
          Task Board
        </h1>
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;
