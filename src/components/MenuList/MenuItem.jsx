import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import r4 from "../../assets/r4.png";
import { addToCart, deleteFood } from "../../util/utilFunctions";
import { useCartContext } from "../../context/CartContext/CartProvider";
import { useMenuContext } from "../../context/MenuContext/MenuProvider";
import { useUserContext } from "../../context/UserContext/UserProvider";
import MenuPopup from "./MenuPopup";
import Skeleton from "react-loading-skeleton";

const MenuItem = ({ item, col, setCurrentFoodItem, setShowItemEdit }) => {
  const { _id, title, price, calories, imageURL, description } = item;
  const [{ menuItems }, menuDispatch] = useMenuContext();
  const [{ cartItems }, cartDispatch] = useCartContext();
  const [{ user, isAdmin, adminMode, isKitchen, kitchenMode }] =
    useUserContext();
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const image = new Image();
    image.src = 'https://source.unsplash.com/RwAXb8Hv_sU'; 

    image.onload = () => {
      setIsLoading(false); 
    };

    image.onerror = () => {
      setIsLoading(false);
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <>
      <motion.div
        whileTap={{ rotate: [0, -1, 1, -1, 0] }}
        className={`${
          !col ? "w-[275px] min-w-[275px]" : "w-[320px] min-w-[320px]"
        } md:w-[300px] md:min-w-[300px] ${
          col ? "my-12" : "my-2 md:my-5"
        } ${isKitchen && kitchenMode ? ' h-[300px] flex flex-col justify-between ' : 'h-auto'} bg-cardOverlay rounded-lg p-2 px-3 backdrop-blur-lg drop-shadow-xl dro hover:drop-shadow-2xl cursor-pointer`}
      >
        {isKitchen && kitchenMode ? (
          <span className="pb-3">
            <p className="text-sm font-bold text-textColor">Dish ID:</p>
            <p className="text-sm text-textColor font-semi-bold"> {_id}</p>
          </span>
        ) : (
          <></>
        )}
        <div className="flex items-center justify-between w-full">
          {isLoading ? (
            <Skeleton
              height={200}
              width={150}
              className="object-contain w-40 h-40 -mt-8 cursor-pointer md:w-48 md:h-40"
            />
          ) : (
            <motion.img
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.1 }}
              className="object-contain w-40 h-40 -mt-8 cursor-pointer md:w-48 md:h-40"
              alt={description}
              src={r4}
            />
          )}
  
          <div className="flex flex-col gap-2">
            {isKitchen && kitchenMode ? null : isAdmin && adminMode ? (
              <>
                <motion.div
                  whileTap={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
                  className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full cursor-pointer md:w-10 md:h-10"
                  title="Edit"
                  onClick={() => {
                    setShowItemEdit(true);
                    setCurrentFoodItem(item);
                  }}
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
              isLoading ? (
                <Skeleton height={40} width={40} /> // Show loading skeleton for the button
              ) : (
                <motion.div
                  whileTap={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
                  className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-primeGold md:w-10 md:h-10"
                  onClick={() => {
                    setShowCustomizePopup(true);
                  }}
                  title="Add to cart"
                >
                  <MdAddShoppingCart className="text-white md:text-xl" />
                </motion.div>
              )
            )}
          </div>
        </div>
  
        <div className="flex flex-col items-end justify-end w-full">
          {isLoading ? (
            <Skeleton height={20} width={150} />
          ) : (
            <p className="text-lg text-textColor font-semi-bold">{title}</p>
          )}
          {isLoading ? (
            <Skeleton height={40} width={200} />
          ) : (
            <p className="mt-1 overflow-hidden text-sm text-gray-500 overflow-ellipsis">
              {description}
            </p>
          )}
          <div className="flex items-center justify-between gap-8 ">
            {isLoading ? (
              <Skeleton height={20} width={80} />
            ) : (
              <p className="text-base font-semibold text-headingColor">
                <span className="text-sm text-[#9B804E]">Rs.</span> {price}
              </p>
            )}
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
