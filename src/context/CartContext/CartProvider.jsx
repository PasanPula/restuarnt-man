import { createContext, useReducer, useContext } from "react";
import CartReducer from "./CartReducer";

const initialState = {
  showCart: false,
  cartItems: [],
  cartTotal: 0,
  paymentMethod: "COD",
  checkoutData: {},
};

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);