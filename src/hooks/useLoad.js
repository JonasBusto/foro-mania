import { useEffect, useState } from 'react';
import { useAppSelector } from './store';

export function useLoad() {
  const statusAuth = useAppSelector((state) => state.user.statusAuth);
  const statusGetUsers = useAppSelector((state) => state.user.status);
  const statusGetCategories = useAppSelector((state) => state.category.status);
  const statusGetReactions = useAppSelector((state) => state.reaction.status);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      (statusAuth === 'Fallido' || statusAuth === 'Exitoso') &&
      (statusGetUsers === 'Fallido' || statusGetUsers === 'Exitoso') &&
      (statusGetCategories === 'Fallido' ||
        statusGetCategories === 'Exitoso') &&
      (statusGetReactions === 'Fallido' || statusGetReactions === 'Exitoso')
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [statusAuth, statusGetUsers, statusGetCategories, statusGetReactions]);

  return { isLoading };
}
