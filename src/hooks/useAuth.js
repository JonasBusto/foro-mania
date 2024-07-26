import { useNavigate } from 'react-router-dom';
import {
  loginUserWithEmail,
  loginUserWithGoogle,
  logoutUser,
  registerUser,
} from '../store/user/thunks';
import { useAppDisptach, useAppSelector } from './store';

export function useAuth() {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const statusSign = useAppSelector((state) => state.user.statusSign);

  const dispatch = useAppDisptach();
  const navigate = useNavigate();

  const loginGoogle = async () => {
    const res = await dispatch(loginUserWithGoogle());

    if (res.error) {
      alert(res.payload);
    } else {
      navigate('/account');
    }
  };

  const loginEmail = async ({ email, password }) => {
    const res = await dispatch(loginUserWithEmail({ email, password }));

    if (res.error) {
      alert(res.payload);
    } else {
      navigate('/account');
    }
  };

  const register = async (user) => {
    const res = await dispatch(registerUser(user));

    if (res.error) {
      alert(res.payload);
    } else {
      navigate('/account');
    }
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return { loggedUser, loginGoogle, loginEmail, register, logout, statusSign };
}
