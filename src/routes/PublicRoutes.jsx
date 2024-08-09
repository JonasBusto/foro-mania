import { Navigate, Outlet } from 'react-router-dom';
import { useLoad } from '../hooks/useLoad';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/items/Loader';

export function PublicRoute() {
  const { loggedUser } = useAuth();
  const { isLoading } = useLoad();

  if (isLoading) {
    return <Loader />;
  }

  if (loggedUser) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}
