import { createContext } from 'react';

export const DarkContext = createContext({
  isDark: false,
  setDark: (isDark: boolean) => {},
});
