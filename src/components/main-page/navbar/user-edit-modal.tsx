import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { changeUserPasswordAPI, deleteUserAPI } from '../../../features/user/userAPI';
import { useInput } from '../../../utils/customHooks';
import { passwordValidator } from '../../../utils/validators';
import Dimmer from '../../common/dimmer';
import ModalWrapper from '../../common/modal-wrapper';
import IconUser from '../../icons/icon-user';
import styles from './user-edit-modal.module.css';

interface UserEditModalProps {
  handleClose: () => void;
}

function UserEditModal({ handleClose }: UserEditModalProps) {
  const { email, type } = useAppSelector((state) => state.user);
  const currPwdInput = useInput('', passwordValidator);
  const newPwdInput = useInput('', passwordValidator);
  const navigate = useNavigate();

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await changeUserPasswordAPI(currPwdInput.value, newPwdInput.value);
      alert('Password Updated');
    } catch (e: any) {
      if (e.response?.status === 400) {
        alert(e.response.data.error);
      } else {
        alert(e.toString());
      }
    } finally {
      handleClose();
    }
  }

  async function handleDeleteAccount() {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Delete Account')) {
        await deleteUserAPI();
        navigate('/', { replace: true });
      }
    } catch (e: any) {
      if (e.response?.status === 400) {
        alert(e.response.data.error);
      } else {
        alert(e.toString());
      }
    }
  }

  return (
    <Dimmer handleClose={handleClose}>
      <ModalWrapper handleClose={handleClose}>
        {type === 'GUEST' ? (
          <div className={styles.guest_blocking}>
            <div>This account is for a temporary GUEST.</div>
            <div>Please register your account 🙂</div>
          </div>
        ) : null}
        <div className={styles.title}>
          <div className={styles.title_icon}>
            <IconUser />
          </div>
          <div>{email}</div>
        </div>
        <form className={styles.form} onSubmit={handleChangePassword}>
          <h3>Password Change</h3>
          <div className={styles.form_inputs}>
            <input type="password" placeholder="Current Password" {...currPwdInput} />
            <input type="password" placeholder="New Password (At least 8 characters)" {...newPwdInput} />
          </div>
          <button
            type="submit"
            disabled={!(currPwdInput.isValid && newPwdInput.isValid)}
            className={`${currPwdInput.isValid && newPwdInput.isValid && styles.isOn}`}
          >
            Send
          </button>
        </form>
        <div className={styles.delete}>
          <button onClick={handleDeleteAccount} className={styles.delete_btn}>
            Delete Account
          </button>
        </div>
      </ModalWrapper>
    </Dimmer>
  );
}

export default UserEditModal;
