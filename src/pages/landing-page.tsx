import { Outlet } from 'react-router-dom';
import React from 'react';
import styles from './landing-page.module.css';

function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPage;
