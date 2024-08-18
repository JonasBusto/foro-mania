import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { getUsers, verifyLoggedUser } from '../store/user/thunks';
import { getCategories } from '../store/category/thunks';
import { getReactions } from '../store/reaction/thunks';
import { getTopics } from '../store/topic/thunks';
import { getFavorites } from '../store/favorite/thunks';
import { getTags } from '../store/tag/thunks';

export function useGetData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyLoggedUser());
    dispatch(getUsers());
    dispatch(getCategories());
    dispatch(getReactions());
    dispatch(getTopics());
    dispatch(getFavorites());
    dispatch(getTags());
  }, []);

  return {};
}
