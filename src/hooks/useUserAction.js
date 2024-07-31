import { useEffect } from 'react';
import { useAppDisptach, useAppSelector } from './store';
import { getUserById, updateUser } from '../store/user/thunks';
import { clearUser } from '../store/user/slice';

export function useUserAction() {
  const users = useAppSelector((state) => state.user.users);
  const user = useAppSelector((state) => state.user.user);
  const userStatusUpdate = useAppSelector((state) => state.user.statusUpdate);
  const userStatus = useAppSelector((state) => state.user.statusUser)

  const dispatch = useAppDisptach();

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
    }
  };

  return {
    users,
    user,
    getUser,
    clearStateUser,
    updateProfile,
    userStatusUpdate,
    userStatus
  };
}
