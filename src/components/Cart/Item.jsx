import {useState} from 'react'
import { motion } from 'framer-motion'
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useCartContext } from '../../context/CartContext/CartProvider';
import r4 from '../../assets/r4.png'
import { useMenuContext } from '../../context/MenuContext/MenuProvider';
import { getMenuById,updateCartItemQty,deleteCartItem } from '../../util/utilFunctions';
import CartPopup from './CartPopup';


const Item = ({item, setShowCustomizePopup,setcartItem }) => {

  const [{ menuItems } ] = useMenuContext();
  const [{ cartItems }, cartDispatch ] = useCartContext();
  const { item_id, qty, totalValue } = item;
  const menuItem = getMenuById(menuItems, item_id);

  return (
    <>
    <div className="flex items-center justify-between w-full gap-2 p-1 px-2 rounded-lg cursor-pointer bg-cartItem hover:shadow-md ">
      <div className="flex items-center gap-2 ">
        <img
          src={r4}
          alt=""
          className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        />

        <div className="flex flex-col gap-0 ">
          <p className="text-base text-gray-50">{menuItem?.title}</p>
          <p className="block text-sm font-semibold text-gray-300">
            Quantity: {qty} <br/>
            <span className="text-xs text-red-600">Rs.</span> {totalValue}
          </p>
        </div>
      </div>

      <motion.div
        whileTap={{ scale: 0.75 }}
        className="flex items-center justify-center w-6 h-6 text-sm bg-green-600 rounded-lg text-gray-50 "
        onClick={() => {
          setcartItem(item)
          console.log("ppop",item)
          setShowCustomizePopup(true)}}
      >
        <BiSolidPencil />
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.75 }}
        className="flex items-center justify-center w-6 h-6 text-sm rounded-lg text-gray-50 bg-cartNumBg"
        onClick={() => deleteCartItem(cartItems, menuItems, item, cartDispatch)}
      >
        <MdDelete />
      </motion.div>
    </div>
    </>
  )
}

export default Item