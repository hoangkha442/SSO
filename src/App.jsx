import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Home from './pages/Home';
import MyApps from './pages/MyApps/MyApps';
import Account from './pages/Account/Account';
import Groups from './pages/Groups/Groups';
import Clients from './pages/Clients/Clients';
import Users from './pages/Users/Users';
import RealSettings from './pages/RealSettings/RealSettings';
import ClientDetail from './pages/Clients/ClientDetail';
import GroupsDetail from './pages/Groups/GroupsDetail';
import AddNewUser from './pages/Users/AddNewUser';
import UserDetail from './pages/Users/UserDetails/UserDetail';
import Registration from './pages/RealSettings/Registration';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/home' element={<Home />}>
          <Route path='my-apps' element={<MyApps />} />
          <Route path='my-account' element={<Account />} />
        </Route>
        <Route path='/admin' element={<Home />}>
          <Route path='groups' element={<Groups />} />
          <Route path='groups/detail/:id' element={<GroupsDetail />} />
          <Route path='clients' element={<Clients />} />
          <Route path='clients/detail/:id' element={<ClientDetail />} />
          <Route path='users' element={<Users />} />
          <Route path='users/add-new' element={<AddNewUser />} />
          <Route path='users/detail/:id' element={<UserDetail />} />
          <Route path='real-settings' element={<RealSettings />} />
          <Route path='real-settings/registration' element={<Registration />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
