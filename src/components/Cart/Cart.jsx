import { useState } from 'react'
import { useCartContext } from '../../context/CartContext/CartProvider';
import { motion } from "framer-motion";
import NotFound from '../NotFound/NotFound';
import CartHeader from './CartHeader';
import CartBody from './CartBody';
import EmptyCart from './EmptyCart';
import Checkout from '../Checkout/Checkout';
import CartPopup from './CartPopup';

const Cart = () => {

const [{ cartItems }] = useCartContext();
const [checkoutOpen, setCheckoutOpen] = useState(false);
const [showCustomizePopup, setShowCustomizePopup] = useState(false);
const [cartItem,setcartItem] = useState()

  return (
    <>
      {showCustomizePopup ? (<CartPopup item={cartItem} setShowCustomizePopup={setShowCustomizePopup}/>) : (
      checkoutOpen ? (
        <Checkout handler={setCheckoutOpen} />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className={`w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0`}
          >
            <CartHeader />
            {cartItems && cartItems.length > 0 ? (
              <CartBody action={setCheckoutOpen} setShowCustomizePopup={setShowCustomizePopup} setcartItem={setcartItem}/>
            ) : (
              <div className="flex items-center justify-center flex-1 w-full h-full">
                <EmptyCart />
              </div>
            )}
          </motion.div>
          {!cartItems && <NotFound text={"Cart Items not available"} />}
        </>
      ))}
    </>
  )
}

export default Cart