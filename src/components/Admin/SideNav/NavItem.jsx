import React from "react";
import { motion } from "framer-motion";
import { useOrderContext } from "../../../context/OrderContext/OrderProvider";
import { useMenuContext } from "../../../context/MenuContext/MenuProvider";

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
        setshowMobileSideNav(false)
 };

 const [{ completedOrders }, orderDispatch] = useOrderContext();
 const [{menuItems}] = useMenuContext();

  return (
    <motion.div
      whileTap={{ scale: 1.1 }}
      onClick={handleClick}
      className={`flex items-center no-underline text-orange-50 hover:text-orange-100 p-3 rounded-md cursor-pointer hover:bg-primeGoldDark ${
        activePage === title ? "bg-primeGoldDark" : ""
      }`}
    >
      <p className="text-xl font-bold">{svgIcon}</p>
      <div className="flex items-center justify-center gap-10 pl-3 font-bold">
        {title}
        {(title === "Menu" || title === "Orders") && (
          <div className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer bg-cartNumBg">
            <p className="text-sm font-semibold text-white">
              {title === "Menu" ? menuItems.length : completedOrders.length}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NavItem;
