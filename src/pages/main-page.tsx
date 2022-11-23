import React from 'react';
import Board from '../components/main-page/board/board';
import Navbar from '../components/main-page/navbar/navbar';
import Sidebar from '../components/main-page/sidebar/sidebar';
import styles from './main-page.module.css';

function MainPage() {
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
