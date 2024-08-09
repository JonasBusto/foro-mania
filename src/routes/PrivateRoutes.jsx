import { Navigate, Outlet } from 'react-router-dom';
import { useLoad } from '../hooks/useLoad';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/items/Loader';

export function PrivateRoute({ allowedRoles }) {
  const { loggedUser } = useAuth();
  const { isLoading } = useLoad();

  if (isLoading) {
    return <Loader />;
  }

  if (!loggedUser) {
    return <Navigate to='/' />;
  }

  if (!allowedRoles.includes(loggedUser.role)) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}
