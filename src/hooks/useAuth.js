import { loginUserWithGoogle, logoutUser } from '../store/user/thunks';
import { useAppDisptach, useAppSelector } from './store';

export function useAuth() {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);

  const dispatch = useAppDisptach();

  const loginGoogle = () => {
    dispatch(loginUserWithGoogle());
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return { loggedUser, loginGoogle, logout };
}
