import { useEffect } from 'react';
import { useAppDisptach } from './store';
import { getUsers, verifyLoggedUser } from '../store/user/thunks';

export function useGetData() {
  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(verifyLoggedUser());
    dispatch(getUsers());
  }, []);

  return {};
}
