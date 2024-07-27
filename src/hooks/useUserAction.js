import { useEffect } from 'react';
import { useAppDisptach, useAppSelector } from './store';
import { getUserById } from '../store/user/thunks';
import { clearUser } from '../store/user/slice';

export function useUserAction() {
  const users = useAppSelector((state) => state.user.users);
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDisptach();

  const getUser = async ({ id }) => {
    await dispatch(getUserById({ id }));
  };

  const clearStateUser = () => {
    dispatch(clearUser());
  };

  return { users, user, getUser, clearStateUser };
}
