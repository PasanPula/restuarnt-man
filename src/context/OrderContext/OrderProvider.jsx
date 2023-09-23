import { createContext, useReducer, useContext } from "react";
import OrderReducer from "./OrderReducer";

const initialState = {
  orders: [],
  pendingOrders: [],
  processingOrders: [],
  completedOrders: []
};
const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(OrderReducer, initialState);
  return (
    <OrderContext.Provider value={[state, dispatch]}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderContext = () => useContext(OrderContext);
