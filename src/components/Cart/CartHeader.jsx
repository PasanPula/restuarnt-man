import { motion } from "framer-motion";
import { MdLogin, MdOutlineKeyboardBackspace } from "react-icons/md";
import { hideCart } from "../../util/utilFunctions";
import { useCartContext } from "../../context/CartContext/CartProvider";
import { MdShoppingBasket } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { useMenuContext } from "../../context/MenuContext/MenuProvider";
import { Link } from "react-router-dom";
import { emptyCart } from "../../util/utilFunctions";
import { useUserContext } from "../../context/UserContext/UserProvider";

const CartHeader = () => {

  const [{cartItems}, cartDispatch] = useCartContext();
  const [{menuItems}] = useMenuContext();
  const [{user}] = useUserContext()

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-white cursor-pointer">
    <motion.div whileTap={{ scale: 0.8 }} onClick={() => hideCart(cartDispatch)}>
      <MdOutlineKeyboardBackspace className="text-2xl text-textColor " />
    </motion.div>

    <div className="flex items-center justify-center gap-2">
      Cart
      <MdShoppingBasket className="text-xl cursor-pointer text-primeGold" />
    </div>

    {/* {
    user ? ( */}
      <motion.p
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 0.9 }}
        onClick={() => emptyCart(cartItems, menuItems,cartDispatch)}
        className="flex items-center justify-center gap-2 p-1 px-2 my-2 text-base rounded-md bg-cardOverlay hover:shadow-sm text-textColor"
      >
        clear <BiRefresh className="text-primeGold" />
      </motion.p>
    {/* ) 
    : (
      <Link to={`/login`} onClick={() => hideCart(cartDispatch)}>
        <motion.p
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 0.9 }}
          className="flex items-center justify-center gap-2 p-1 px-2 my-2 text-base rounded-md bg-cardOverlay hover:shadow-sm text-textColor"
        >
          <MdLogin className="text-cartNumBg" /> Login to cart
        </motion.p>
      </Link>
    )} */}
  </div>
  )
}

export default CartHeader