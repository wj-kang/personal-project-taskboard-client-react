import React from 'react';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a className={styles.logo} href="/main">
        <h1>{`📋 TaskBoard`}</h1>
      </a>
      <div className={styles.btns}>btns</div>
    </nav>
  );
}

export default Navbar;
