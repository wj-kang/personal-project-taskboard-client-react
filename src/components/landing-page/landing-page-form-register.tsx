import { Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../utils/customHooks';
import { emailValidator, passwordValidator } from '../../utils/validators';
import styles from './landing-page-form.module.css';

function LandingPageFormRegister() {
  const navigate = useNavigate();
  const emailInput = useInput('', emailValidator);
  const passwordInput = useInput('', passwordValidator);
  const passwordCheckInput = useInput('', (v) => passwordInput.value === v);

  return (
    <div className={styles.container}>
      <h1>Register</h1>
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
        sx={{ marginTop: '2rem' }}
      />

      <TextField
        {...passwordCheckInput}
        error={passwordCheckInput.value.length > 0 && !passwordCheckInput.isValid}
        variant="outlined"
        label="Confirm Password"
        type="password"
        helperText="at least 8 characters"
        required
        fullWidth
        sx={{ marginTop: '0.75rem' }}
      />

      <Button
        disabled={!emailInput.isValid || !passwordInput.isValid || !passwordCheckInput.isValid}
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{ padding: '1rem', marginTop: '1.5rem' }}
      >
        Register
      </Button>

      <Button
        onClick={() => navigate('/login', { replace: true })}
        variant="text"
        size="small"
        sx={{ marginTop: '1rem', textTransform: 'none' }}
      >
        Already Registered? Login
      </Button>
      <div className={styles.btns}></div>
    </div>
  );
}

export default LandingPageFormRegister;
