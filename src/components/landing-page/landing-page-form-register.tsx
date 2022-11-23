import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegisterAPI } from '../../features/user/userAPI';
import { useInput } from '../../utils/customHooks';
import { emailValidator, passwordValidator } from '../../utils/validators';
import styles from './landing-page-form.module.css';

function LandingPageFormRegister() {
  const navigate = useNavigate();
  const emailInput = useInput('', emailValidator);
  const passwordInput = useInput('', passwordValidator);
  const passwordCheckInput = useInput('', (v) => passwordInput.value === v);
  const [error, setError] = useState<string>('');

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await userRegisterAPI(emailInput.value, passwordInput.value);

      alert(`New account has been created 🎉\nPlease login with your account.`);
      navigate('/login');
      //
    } catch (e: any) {
      if (e.response?.status === 400) {
        setError(e.response.data.error);
      } else {
        setError(e.toString());
      }
    }
  }

  return (
    <form onSubmit={handleRegister} className={styles.container}>
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

      <Typography variant="body1" sx={{ color: 'red', marginTop: '1rem' }}>
        {error.length > 0 && error}
      </Typography>

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
    </form>
  );
}

export default LandingPageFormRegister;
