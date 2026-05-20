import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDataUser } from './store/dataUserSlice';
import { setGlobalRole } from './store/roleSlice';
import { rootState } from './store/store';
import Login from './pages/Auth/Login';
import MyApps from './pages/User/MyApps/MyApps';
import Account from './pages/User/Account/Account';
import Groups from './pages/Admin/Groups/Groups';
import GroupsDetail from './pages/Admin/Groups/GroupsDetail';
import Clients from './pages/Admin/Clients/Clients';
import ClientDetail from './pages/Admin/Clients/ClientDetail';
import Users from './pages/Admin/Users/Users';
import AddNewUser from './pages/Admin/Users/AddNewUser';
import UserDetail from './pages/Admin/Users/UserDetails/UserDetail';
import RealSettings from './pages/Admin/RealSettings/RealSettings';
import Registration from './pages/Admin/RealSettings/Registration';
import Home from './pages/Home';
import UserService from './SSOAuth/UserService';
import AddNewClient from './pages/Admin/Clients/AddNewClient';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  resource_access: {
    [key: string]: {
      roles: string[];
    };
  };
  realm_access: {
    roles: string[];
  };
  preferred_username: string;
  email: string;
}

function App() {
  const dispatch = useDispatch();
  const [role, setRole] = useState<string | string[]>('');
  const currentToken = useSelector((state: rootState) => state.dataUser.token);

  useEffect(() => {
    if (UserService.getToken() == undefined) {
      UserService.doLogin();
      
    }
  }, []);

  useEffect(() => {
    if (currentToken === '' && UserService.getToken() !== undefined) {
      dispatch(setDataUser(UserService.getToken()));
    }
  }, [currentToken, dispatch]);

  useEffect(() => {
    if (currentToken !== '') {
      const currentUser = jwtDecode<CustomJwtPayload>(currentToken);
      console.log('currentUser: ', currentUser.resource_access['realm-management']);

      if (currentUser.resource_access['realm-management'] && currentUser.resource_access['realm-management'].roles) {
        setRole(currentUser.resource_access['realm-management'].roles);
      } else {
        setRole('user');
      }
    }
  }, [currentToken]);

  useEffect(() => {
    if (Array.isArray(role) && role.includes('realm-admin')) {
      dispatch(setGlobalRole('admin'));
    } else {
      dispatch(setGlobalRole('user'));
    }
  }, [role, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        {currentToken !== '' && UserService.isLoggedIn() ? (
          <Route path='/' element={<Home />}>
            {Array.isArray(role) && role.includes('realm-admin') ? (
              <>
                <Route path='/clients' element={<Clients />} />
                <Route path='/clients/add-new' element={<AddNewClient />} />
                <Route path='/groups' element={<Groups />} />
                <Route path='groups/detail/:id' element={<GroupsDetail />} />
                <Route path='clients/detail/:id' element={<ClientDetail />} />
                <Route path='users' element={<Users />} />
                <Route path='users/add-new' element={<AddNewUser />} />
                <Route path='users/detail/:id' element={<UserDetail />} />
                <Route path='real-settings' element={<RealSettings />} />
                <Route path='real-settings/registration' element={<Registration />} />
              </>
            ) : (
              <>
                <Route path='/my-apps' element={<MyApps />} />
                <Route path='/my-account' element={<Account />} />
              </>
            )}
          </Route>
        ) : (
          <Route path='/' element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
