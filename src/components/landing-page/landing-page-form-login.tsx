import { Button, TextField, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../apis';
import { useAppDispatch } from '../../app/hooks';
import { useInput } from '../../utils/customHooks';
import { emailValidator, passwordValidator } from '../../utils/validators';
import styles from './landing-page-form.module.css';

interface loginResponseData {
  id: string;
  email: string;
  type: string;
  token: string;
}

function LandingPageFormLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const emailInput = useInput('', emailValidator);
  const passwordInput = useInput('', passwordValidator);
  const [error, setError] = useState<string>('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response: AxiosResponse<loginResponseData> = await userAPI().post('/login', {
        email: emailInput.value,
        password: passwordInput.value,
      });

      const { id, email, type, token } = response.data;
      dispatch({ type: 'user/login', payload: { id, email, type } });
      sessionStorage.setItem('token', token);

      navigate('/main');
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
    <form onSubmit={handleLogin} className={styles.container}>
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

      <Typography variant="body1" sx={{ color: 'red', marginTop: '1rem' }}>
        {error.length > 0 && error}
      </Typography>

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
    </form>
  );
}

export default LandingPageFormLogin;
