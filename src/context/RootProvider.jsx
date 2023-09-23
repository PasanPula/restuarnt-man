import React from "react";
import { MenuProvider } from "./MenuContext/MenuProvider";
import { CartProvider } from "./CartContext/CartProvider";
import { UserProvider } from "./UserContext/UserProvider";
import { OrderProvider } from "./OrderContext/OrderProvider";

const RootProvider = ({ children }) => {
  return (
    <UserProvider>
      <MenuProvider>
        <CartProvider>
          <OrderProvider>
          {children}
         </OrderProvider>
        </CartProvider>
      </MenuProvider>
    </UserProvider>
  );
};

export default RootProvider;
