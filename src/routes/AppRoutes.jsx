import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/users/Login';
import { Register } from '../pages/users/Register';
import { Users } from '../pages/users/Users';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/users' element={<Users />} />
    </Routes>
  );
}
