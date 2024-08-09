import { useAppDispatch, useAppSelector } from './store';
import { getUserById, updateUser } from '../store/user/thunks';
import { clearUser } from '../store/user/slice';
import { useNavigate } from 'react-router-dom';

export function useUserAction() {
  const users = useAppSelector((state) => state.user.users);
  const allUsersStatus = useAppSelector((state) => state.user.status);
  const user = useAppSelector((state) => state.user.user);
  const userStatusUpdate = useAppSelector((state) => state.user.statusUpdate);
  const userStatus = useAppSelector((state) => state.user.statusUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getUser = async ({ id }) => {
    await dispatch(getUserById({ id }));
  };

  const clearStateUser = () => {
    dispatch(clearUser());
  };

  const updateProfile = async ({ fullName, fileImage }) => {
    const res = await dispatch(updateUser({ fullName, fileImage }));
    if (res.error) {
      alert(res.payload);
    } else {
      alert('Datos guardados exitosamente');
      navigate('/');
    }
  };

  return {
    users,
    user,
    getUser,
    clearStateUser,
    updateProfile,
    userStatusUpdate,
    userStatus,
    allUsersStatus,
  };
}
