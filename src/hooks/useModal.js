import { switchLogin, switchRegister } from '../store/modals/slice';
import { useAppDispatch } from './store';

export function useModal() {
  const dispatch = useAppDispatch();

  const switchModalLogin = () => {
    dispatch(switchLogin());
  };

  const switchModalRegister = () => {
    dispatch(switchRegister());
  };

  return { switchModalLogin, switchModalRegister };
}
