import { useNavigate } from 'react-router-dom';
import {
  loginUserWithEmail,
  loginUserWithGoogle,
  logoutUser,
  registerUser,
} from '../store/user/thunks';
import { useAppDispatch, useAppSelector } from './store';

export function useAuth() {
  const loggedUser = useAppSelector((state) => state.user.loggedUser);
  const statusSign = useAppSelector((state) => state.user.statusSign);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginGoogle = async ({ setOpenSignIn }) => {
    const res = await dispatch(loginUserWithGoogle());

    if (res.error) {
      alert(res.payload);
    } else {
      setOpenSignIn(false);
      navigate('/');
    }
  };

  const loginEmail = async ({ email, password }, { setOpenSignIn }) => {
    const res = await dispatch(loginUserWithEmail({ email, password }));

    if (res.error) {
      alert(res.payload);
    } else {
      setOpenSignIn(false);
      navigate('/');
    }
  };

  const register = async (user, { setOpenRegister }) => {
    const res = await dispatch(registerUser(user));

    if (res.error) {
      alert(res.payload);
    } else {
      setOpenRegister(false);
      navigate('/account');
    }
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return { loggedUser, loginGoogle, loginEmail, register, logout, statusSign };
}
