import React from 'react'
import {motion} from 'framer-motion'
import { useCartContext } from '../../context/CartContext/CartProvider'

const CartTotal = ({checkoutState}) => {
  const [{cartTotal}] = useCartContext();
  return (
    <div className='w-full mt-2 md:mt-0 flex-1 rounded bg-cartItem rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-evenly'>
        <div className="flex items-center justify-between w-full">
          <p className="text-base text-gray-400 md:text-lg ">Sub Total</p>
          <p className="text-base text-gray-400 md:text-lg">-</p>
          <p className="text-base text-gray-400 md:text-lg "><span className="text-sm text-primeGold">Rs.</span> {cartTotal}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-base text-gray-400 md:text-lg ">Discounts</p>
          <p className="text-base text-gray-400 md:text-lg">-</p>
          <p className="text-base text-gray-400 md:text-lg "><span className="text-sm text-primeGold">Rs.</span> {0.00}</p>
        </div>
        <div className="w-full border-b border-gray-600 my-"></div>
        <div className="flex items-center justify-between w-full">
        <p className="text-base uppercase text-gray-50 md:text-lg">Total</p>
        <p className="text-base text-gray-50 md:text-lg">-</p>
          <p className="text-base text-gray-50 md:text-lg "><span className="text-sm text-primeGold">Rs.</span> {cartTotal}</p>
        </div>
        <motion.button onClick = {() => checkoutState(true)} whileTap={{scale:0.8}} className='w-full p-2 my-2 text-lg rounded-full bg-primeGold text-gray-50 hover:shadow-lg'>
          Checkout Rs.{cartTotal}
        </motion.button>
    </div>
  )
}

export default CartTotal