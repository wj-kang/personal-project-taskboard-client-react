import { Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../utils/customHooks';
import { emailValidator, passwordValidator } from '../../utils/validators';
import styles from './landing-page-form.module.css';

function LandingPageFormLogin() {
  const navigate = useNavigate();
  const emailInput = useInput('', emailValidator);
  const passwordInput = useInput('', passwordValidator);

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <TextField
        {...emailInput}
        error={emailInput.value.length > 0 && !emailInput.isValid}
        name="email"
        variant="outlined"
        label="Email"
        required
        fullWidth
      />

      <TextField
        {...passwordInput}
        error={passwordInput.value.length > 0 && !passwordInput.isValid}
        name="password"
        type="password"
        variant="outlined"
        label="Password"
        required
        fullWidth
        sx={{ marginTop: '1rem' }}
      />

      <Button
        disabled={!emailInput.isValid || !passwordInput.isValid}
        type="submit"
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
