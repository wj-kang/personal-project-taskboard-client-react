import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPageIndex from './components/landing-page/landing-page-index';
import LandingPage from './pages/landing-page';
import LandingPageFormLogin from './components/landing-page/landing-page-form-login';
import LandingPageFormRegister from './components/landing-page/landing-page-form-register';
import MainPage from './pages/main-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<LandingPageIndex />} />
          <Route path="login" element={<LandingPageFormLogin />} />
          <Route path="register" element={<LandingPageFormRegister />} />
        </Route>

        <Route path="/main" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
