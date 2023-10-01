import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import {
  MdAddModerator,
  MdOutlineFavoriteBorder,
  MdRestaurantMenu,
} from "react-icons/md";
import { motion } from "framer-motion";
import { FaCogs } from "react-icons/fa";
import NavItem from "./NavItem";
import AddMenu from "../AddMenu/AddMenu";
import EditMenu from "../EditMenu/EditMenu";
import Stat from "../../Stats/Stat";
import Orders from "../Orders/Orders";

const SideNavMenu = ({ activePage, setActivePage, setPageContent, setshowMobileSideNav }) => {
  // Side Nav Bar buttons
  return (
    <motion.nav
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
    className="w-full space-y-2 "
  >
    <NavItem
      activePage={activePage}
      svgIcon={<AiFillDashboard />}
      title="Dashboard"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      // Nav page to be renderd on the dashboard body - Statistics Page - Component -> Stats -> Stat.jsx
      pageContent={<Stat/>}
      setshowMobileSideNav={setshowMobileSideNav}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdAddModerator />}
      title="Add Food"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      // Nav page to be renderd on the dashboard body - Add new dish to menu - Component -> Admins -> addmenu -> Addmenu.jsx
      pageContent={<AddMenu/>}
      setshowMobileSideNav={setshowMobileSideNav}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdRestaurantMenu />}
      title="Menu"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      // Nav page to be renderd on the dashboard body - Edit Availeb Dish in the Menu - Component -> Admins -> editmenu -> Editmenu.jsx
      pageContent={<EditMenu/>}
      setshowMobileSideNav={setshowMobileSideNav}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdOutlineFavoriteBorder />}
      title="Orders"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      setshowMobileSideNav={setshowMobileSideNav}
      // Nav page to be renderd on the dashboard body - Show Completd Orders - Component -> Admins -> Orders-> Orders.jsx
      pageContent={
        <Orders/>
      }
    />
  </motion.nav>
  )
};

export default SideNavMenu;
