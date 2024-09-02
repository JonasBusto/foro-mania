import { switchLogin, switchRegister } from '../store/modals/slice';
import { useAppDispatch, useAppSelector } from './store';

export function useModal() {
  const showRegisterModal = useAppSelector(
    (state) => state.modal.registerModal
  );
  const showLoginModal = useAppSelector((state) => state.modal.loginModal);

  const dispatch = useAppDispatch();

  const switchModalLogin = () => {
    dispatch(switchLogin());
  };

  const switchModalRegister = () => {
    dispatch(switchRegister());
  };

  return {
    switchModalLogin,
    switchModalRegister,
    showLoginModal,
    showRegisterModal,
  };
}
