import { Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './landing-page-form.module.css';

function LandingPageFormLogin() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <TextField name="email" variant="outlined" label="Email" required fullWidth />

      <TextField
        name="password"
        type="password"
        variant="outlined"
        label="Password"
        required
        fullWidth
        sx={{ marginTop: '1rem' }}
      />

      <Button
        type="submit"
        disabled={false}
        variant="contained"
        size="large"
        fullWidth
        sx={{ padding: '1rem', marginTop: '1.5rem' }}
      >
        Login
      </Button>

      <Button
        onClick={() => navigate('/register', { replace: true })}
        variant="text"
        size="small"
        sx={{ marginTop: '1rem', textTransform: 'none' }}
      >
        Need an Account? Register
      </Button>
      <div className={styles.btns}></div>
    </div>
  );
}

export default LandingPageFormLogin;
