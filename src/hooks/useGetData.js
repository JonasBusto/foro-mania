import { useEffect } from 'react';
import { useAppDisptach } from './store';
import { verifyLoggedUser } from '../store/user/thunks';

export function useGetData() {
  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(verifyLoggedUser());
  }, []);

  return {};
}
