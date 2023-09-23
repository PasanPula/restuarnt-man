import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { HiRefresh } from "react-icons/hi";
import { MdPendingActions,MdDone } from "react-icons/md";

import {
  MdAddModerator,
  MdOutlineFavoriteBorder,
  MdRestaurantMenu,
} from "react-icons/md";
import { motion } from "framer-motion";
import { FaCogs } from "react-icons/fa";
import NavItem from "./KitchenNavItem";
import Orders from "../OrderList/OrdersList";
import OrdersList from "../OrderList/OrdersList";
import { KitchenPages } from "../../../configs/Constants/Pages";
import EditMenu from "../../Admin/EditMenu/EditMenu";

const SideNavMenu = ({ activePage, setActivePage, setPageContent, setshowMobileSideNav }) => {
  return (
    <motion.nav
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
    className="w-full space-y-2 "
  >
    <NavItem
      activePage={activePage}
      svgIcon={<MdPendingActions />}
      title="Pending"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={ <OrdersList page={KitchenPages.PENDING} /> }
      setshowMobileSideNav={setshowMobileSideNav}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<HiRefresh />}
      title="Processing"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<OrdersList page={KitchenPages.PROCESSING}/> }
      setshowMobileSideNav={setshowMobileSideNav}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdDone />}
      title="Completed"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      pageContent={<OrdersList page={KitchenPages.COMPLETED}/> }
      setshowMobileSideNav={setshowMobileSideNav}
    />
    <NavItem
      activePage={activePage}
      svgIcon={<MdOutlineFavoriteBorder />}
      title="Menu"
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      setshowMobileSideNav={setshowMobileSideNav}
      pageContent={
        <EditMenu/>
      }
    />
  </motion.nav>
  )
};

export default SideNavMenu;
