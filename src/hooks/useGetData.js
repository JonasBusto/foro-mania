import { useEffect } from 'react';
import { useAppDisptach } from './store';
import { getUsers, verifyLoggedUser } from '../store/user/thunks';
import { getCategories } from '../store/category/thunks';
import { getReactions } from '../store/reaction/thunks';
import { getTopics } from '../store/topic/thunks';

export function useGetData() {
  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(verifyLoggedUser());
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getReactions());
    dispatch(getTopics());

  }, []);

  return {};
}
