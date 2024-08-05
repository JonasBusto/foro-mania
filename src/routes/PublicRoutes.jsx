import { Navigate, Outlet } from 'react-router-dom';
import { useLoad } from '../hooks/useLoad';
import { useAuth } from '../hooks/useAuth';

export function PublicRoute() {
  const { loggedUser } = useAuth();
  const { isLoading } = useLoad();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (loggedUser) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}
