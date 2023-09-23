import { createContext, useReducer, useContext } from 'react';
import MenuReducer from './MenuReducer';

const initialState = { menuItems: [] };
const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [state, dispatch] = useReducer(MenuReducer, initialState);
  return (
    <MenuContext.Provider value={[ state, dispatch ]}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenuContext = () => useContext(MenuContext);
