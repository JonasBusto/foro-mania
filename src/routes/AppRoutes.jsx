import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/users/Login';
import { Register } from '../pages/users/Register';
import { Users } from '../pages/users/Users';
import { PublicRoute } from './PublicRoutes';
import { UserProfile } from '../pages/users/UserProfile';
import { PrivateRoute } from './PrivateRoutes';
import { FormUser } from '../pages/users/FormUser';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<PublicRoute />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path='/users' element={<Users />} />
        <Route path='/users/upload' element={<FormUser />} />
        <Route path='/users/upload/:id' element={<FormUser />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={['admin', 'user']} />}>
        <Route path='/account' element={<UserProfile />} />
      </Route>
    </Routes>
  );
}
