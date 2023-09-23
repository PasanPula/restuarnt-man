import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUserContext } from "../../../context/UserContext/UserProvider";
import { useMenuContext } from "../../../context/MenuContext/MenuProvider";
import { useOrderContext } from "../../../context/OrderContext/OrderProvider";
import { KitchenPages } from "../../../configs/Constants/Pages";

const NavItem = ({
  activePage,
  svgIcon,
  title,
  setActivePage,
  setPageContent,
  setshowMobileSideNav,
  pageContent,
}) => {

const handleClick = () => {
        setActivePage(title);
        setPageContent(pageContent);
        setshowMobileSideNav(false);
        // fetchOrders()
 };

 const [{pendingOrders, processingOrders, completedOrders}] = useOrderContext();
 const [{menuItems}] = useMenuContext();
 const [itemCount,setItemCount] = useState(1);

 useEffect(() => {
  switch (title) {
    case KitchenPages.MENU:
      setItemCount(menuItems.length)
      break;
    case KitchenPages.PENDING:
      setItemCount(pendingOrders.length)
      break;
    case KitchenPages.PROCESSING:
      setItemCount(processingOrders.length)
      break;
    case KitchenPages.COMPLETED:
      setItemCount(completedOrders.length)
      break;
  default:
      setItemCount(6)
  }
 }, [])
 

  return (
    <motion.div
      whileTap={{ scale: 1.1 }}
      onClick={handleClick}
      className={`flex items-center no-underline text-orange-50 hover:text-orange-100 p-3 rounded-md cursor-pointer hover:bg-orange-700 ${
        activePage === title ? "bg-orange-700" : ""
      }`}
    >
      <p className="text-xl font-bold">{svgIcon}</p>
      <div className="flex items-center justify-between flex-1 gap-10 pl-3 font-bold ">
        {title}
        <div className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer bg-cartNumBg">
            <p className="text-sm font-semibold text-white">
              {itemCount}
            </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NavItem;
