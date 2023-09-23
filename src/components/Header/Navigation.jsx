import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { useCartContext } from '../../context/CartContext/CartProvider';
import { CartTypes } from '../../configs/Constants/ActionTypes';
import { useUserContext } from '../../context/UserContext/UserProvider';


const Navigation = () => {

  const [{ cartItems }, cartDispatch] = useCartContext();
  const [{ user }] = useUserContext();
  const handleToggleCart = () => {
    cartDispatch({
      type: CartTypes.TOGGLE_CART,
      showCart: true,
    });
  };

  return (
    <div className="flex items-center gap-8">
    <motion.ul
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`flex items-center gap-8`}
    >

    {/* { user && */}
      <motion.li
        whileHover={{ scale: 1.1 }}
        className="text-base transition-all duration-100 ease-in-out cursor-pointer md:text-sm lg:text-md text-textColor hover:text-headingColor"
      >
        <Link to={'/'}>Menu</Link>
      </motion.li> 
      {/* } */}

    {/* { user && */}
      <motion.li
        whileHover={{ scale: 1.1 }}
        className="text-base transition-all duration-100 ease-in-out cursor-pointer md:text-sm lg:text-md text-textColor hover:text-headingColor"
      >
        <Link to={'/orders'}>Orders</Link>
      </motion.li>
      {/* } */}

    
    </motion.ul>

    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="relative flex items-center justify-center text-textColor"
      onClick={handleToggleCart}
    >
      <MdShoppingBasket className="text-2xl cursor-pointer" />
      {cartItems && (
        <div className="absolute flex items-center justify-center w-5 h-5 rounded-full cursor-pointer -top-2 -right-2 bg-cartNumBg">
          <p className="text-sm font-semibold text-white">
            {cartItems.length}
          </p>
        </div>
      )}
    </motion.div>
  </div>
  )
}

export default Navigation