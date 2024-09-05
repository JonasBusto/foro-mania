import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { MyAccount } from '../pages/auth/MyAccount';
import { PrivateRoute } from './PrivateRoutes';
import { EditProfile } from '../pages/auth/EditProfile';
import { FormCategory } from '../pages/categories/FormCategory';
import { Categories } from '../pages/categories/Categories';
import { About } from '../pages/About';
import { Topic } from '../pages/topic/Topic';
import { UploadTopic } from '../pages/topic/UploadTopic';
import { TopicList } from '../pages/topic/TopicList';
import { CategoriesView } from '../pages/CategoriesView';
import { UsersView } from '../pages/users/UsersView';
import { UsersSummary } from '../pages/users/UsersSummary';
import ChatView from '../pages/ChatView';
import { Tags } from '../pages/tag/Tags';
import { FormTag } from '../pages/tag/FormTag';
import { Error404 } from '../pages/Error404';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Error404 />} />
      <Route path='/topic/:id' element={<Topic />} />
      <Route path='/all-categories' element={<CategoriesView />} />
      <Route path='/topic-list' element={<TopicList />} />
      <Route path='/about' element={<About />} />
      <Route path='/users-view' element={<UsersView />} />
      <Route path='/users-view/:id/summary' element={<UsersSummary />} />
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/upload/' element={<FormCategory />} />
        <Route path='/categories/upload/:id' element={<FormCategory />} />{' '}
        <Route path='/tags' element={<Tags />} />
        <Route path='/tags/upload/' element={<FormTag />} />
        <Route path='/tags/upload/:id' element={<FormTag />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={['admin', 'user']} />}>
        <Route path='/upload-topic' element={<UploadTopic />} />
        <Route path='/upload-topic/:id' element={<UploadTopic />} />
        <Route path='/account' element={<MyAccount />} />
        <Route path='/account/edit' element={<EditProfile />} />{' '}
        <Route path='/chats' element={<ChatView />} />
      </Route>
    </Routes>
  );
}
