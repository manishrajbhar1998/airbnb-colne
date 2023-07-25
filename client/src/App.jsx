import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import AccountPage from './pages/AccountPage';
axios.defaults.baseURL = "http://127.0.0.1:5500";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App