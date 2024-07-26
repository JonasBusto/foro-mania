import { createContext } from 'react';
import { useGetData } from '../hooks/useGetData';
import { useLoad } from '../hooks/useLoad';

export const AppContext = createContext();

export function AppProvider({ children }) {
  useGetData();
  const { isLoading } = useLoad();

  return (
    <AppContext.Provider value={{ isLoading }}>{children}</AppContext.Provider>
  );
}
