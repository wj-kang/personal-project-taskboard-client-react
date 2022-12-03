import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import IconLogout from '../../icons/icon-logout';
import IconUser from '../../icons/icon-user';
import styles from './navbar.module.css';
import UserEditModal from './user-edit-modal';

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);

  function toggleEditMode() {
    setEditMode((prev) => !prev);
  }
  function handleLogout() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Logout')) {
      dispatch({ type: 'user/logout' });
      sessionStorage.removeItem('token');
      navigate('/', { replace: true });
    }
  }

  return (
    <>
      {editMode && <UserEditModal handleClose={toggleEditMode} />}
      <nav className={styles.navbar}>
        <a className={styles.logo} href="/main">
          <h1>{`📋 TaskBoard`}</h1>
        </a>
        <div className={styles.btns}>
          <button onClick={toggleEditMode}>
            <IconUser />
          </button>
          <button onClick={handleLogout}>
            <IconLogout />
          </button>
        </div>
      </nav>
    </>
  );
}

export default memo(Navbar);
