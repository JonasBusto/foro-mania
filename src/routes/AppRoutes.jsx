import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Users } from '../pages/users/Users';
import { MyAccount } from '../pages/auth/MyAccount';
import { PrivateRoute } from './PrivateRoutes';
import { FormUser } from '../pages/users/FormUser';
import { EditProfile } from '../pages/auth/EditProfile';
import { FormCategory } from '../pages/categories/FormCategory';
import { Categories } from '../pages/categories/Categories';
import Topic from '../pages/Topic';
import { About } from '../pages/About';
import { UsersView } from '../pages/UsersView';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/topic' element={<Topic />} />
      <Route path='/about' element={<About />} />
      <Route path='/users-view' element={<UsersView />} />
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path='/users' element={<Users />} />
        <Route path='/users/upload' element={<FormUser />} />
        <Route path='/users/upload/:id' element={<FormUser />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/upload/' element={<FormCategory />} />
        <Route path='/categories/upload/:id' element={<FormCategory />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={['admin', 'user']} />}>
        <Route path='/account' element={<MyAccount />} />
        <Route path='/account/edit' element={<EditProfile />} />
      </Route>
    </Routes>
  );
}
