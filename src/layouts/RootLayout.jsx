import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import { useCartContext } from '../context/CartContext/CartProvider'
import Cart from '../components/Cart/Cart';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { useUserContext } from '../context/UserContext/UserProvider';
import { useMenuContext } from '../context/MenuContext/MenuProvider';
import { fetchMenuData } from '../api/api';

export const RootLayout = () => {

  const [{showCart}] = useCartContext();
  const [{isAdmin, adminMode, isKitchen, kitchenMode}, userDispatch]  = useUserContext();
  const [{ menuItems }, dispatch] = useMenuContext();

  useEffect(() => {
    fetchMenuData(dispatch)
  }, [])

  return (
    <>
    <ToastContainer />
     <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
      {!((isAdmin && adminMode) || (isKitchen && kitchenMode) )&& <Header />}
       {showCart && <Cart />}
       <main
          className={`${
            !((isAdmin && adminMode) || (isKitchen && kitchenMode) )&&
            "mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4"
          } w-full h-auto`}
          onClick={() => {}}
        >
          <Outlet/>
        </main>
     </div>
    </>

  )
}
