import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { CssBaseline } from '@mui/material';
import Loader from './components/common/loader';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <Loader />
      <App />
    </Provider>
  </React.StrictMode>
);
