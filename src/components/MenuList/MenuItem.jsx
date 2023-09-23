import {useState} from "react";
import { motion } from "framer-motion";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import r4 from '../../assets/r4.png';
import { addToCart, deleteFood } from "../../util/utilFunctions";
import { useCartContext } from "../../context/CartContext/CartProvider";
import { useMenuContext } from "../../context/MenuContext/MenuProvider";
import { useUserContext } from "../../context/UserContext/UserProvider";
import MenuPopup from "./MenuPopup";

const MenuItem = ({item, col, admin}) => {
    const { id, title, price, calories, imageURL, description } = item;
    const [{ menuItems }, menuDispatch] =  useMenuContext();
    const [{ cartItems }, cartDispatch] =  useCartContext();
    const [{ user,isAdmin, adminMode } ] =  useUserContext();
    const [showCustomizePopup, setShowCustomizePopup] = useState(false);
    
  return ( 
    <>
  <motion.div
    whileTap={{ rotate: [0, -1, 1, -1, 0] }}
    className={`${
      !col ? "w-[275px] min-w-[275px]" : "w-[320px] min-w-[320px]"
    } md:w-[300px] md:min-w-[300px] ${
      col ? "my-12" : "my-2 md:my-5"
    } h-auto bg-cardOverlay rounded-lg p-2 px-3 backdrop-blur-lg hover:drop-shadow-sm cursor-pointer`}
  >
    <div className="flex items-center justify-between w-full">
      <motion.img
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        className="object-contain w-40 h-40 -mt-8 cursor-pointer md:w-48 md:h-40"
        alt={description}
        src={r4}
      />
   
   <div className="flex flex-col gap-2">
      {isAdmin && adminMode ? (
        <>
          <motion.div
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full cursor-pointer md:w-10 md:h-10"
            title="Edit"
          >
            <BiEditAlt className="text-white md:text-xl" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full cursor-pointer md:w-10 md:h-10"
            onClick={() => deleteFood(item, menuItems, menuDispatch)}
            title="Delete"
          >
            <MdDeleteForever className="text-white md:text-xl" />
          </motion.div>
        </>
      ) : (
        <motion.div
          whileTap={{ scale: 1.1 }}
          whileHover={{ scale: 1.2 }}
          className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full cursor-pointer md:w-10 md:h-10"
          onClick={() => {
            setShowCustomizePopup(true)
        }}
          title="Add to cart"
        >
          <MdAddShoppingCart className="text-white md:text-xl" />
        </motion.div>
      )}
    </div>
    </div>

    <div className="flex flex-col items-end justify-end w-full">
      <p className="text-lg text-textColor font-semi-bold">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{description} </p>
      <div className="flex items-center justify-between gap-8 ">
        <p className="text-base font-semibold text-headingColor">
          <span className="text-sm text-red-600">Rs.</span> {price}
        </p>
      </div>
    </div>
  </motion.div>
 
       {/* Customize popup */}
       {showCustomizePopup && (
        <MenuPopup item={item} setShowCustomizePopup={setShowCustomizePopup} />
      )}


  
  </>
  );
};

export default MenuItem;
