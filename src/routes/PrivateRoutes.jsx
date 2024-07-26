import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/store';
import { useLoad } from '../hooks/useLoad';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute({ allowedRoles }) {
  const { loggedUser } = useAuth();
  const { isLoading } = useLoad();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!loggedUser) {
    return <Navigate to='/login' />;
  }

  if (!allowedRoles.includes(loggedUser.role)) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}
