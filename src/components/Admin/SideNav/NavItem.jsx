import React from "react";
import { motion } from "framer-motion";
import { useUserContext } from "../../../context/UserContext/UserProvider";
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

 const [{users}] = useUserContext();
 const [{menuItems}] = useMenuContext();

  return (
    <motion.div
      whileTap={{ scale: 1.1 }}
      onClick={handleClick}
      className={`flex items-center no-underline text-orange-50 hover:text-orange-100 p-3 rounded-md cursor-pointer hover:bg-orange-700 ${
        activePage === title ? "bg-orange-700" : ""
      }`}
    >
      <p className="text-xl font-bold">{svgIcon}</p>
      <div className="flex items-center justify-center gap-10 pl-3 font-bold">
        {title}
        {(title === "Menu" || title === "Users") && (
          <div className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer  bg-cartNumBg">
            <p className="text-sm font-semibold text-white">
              {title === "Menu" ? menuItems.length : users.length}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NavItem;
