import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Home from './pages/Home';
import MyApps from './pages/MyApps/MyApps';
import Account from './pages/Account/Account';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/home' element={<Home />}>
          <Route path='my-apps' element={<MyApps />} />
          <Route path='my-account' element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
