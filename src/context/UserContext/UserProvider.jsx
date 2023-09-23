import { createContext, useReducer, useContext } from 'react';
import UserReducer from './UserReducer';

const initialState = {  
    // user: sessionUser,
    user: null,
    isAdmin: false,
    isKitchen: false,
    adminMode: false,
    kitchenMode: false,
    // adminMode: sessionUserMode,
 };
const UserContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  return (
    <UserContext.Provider  value={[ state, dispatch ]}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
