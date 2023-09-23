import React from 'react'
import { motion } from "framer-motion";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { PiCookingPot } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/UserContext/UserProvider';
import { ToggleAdminMode, ToggleKitchenMode, logout } from '../../util/utilFunctions';


const Dropdown = ({user}) => {

  const navigate = useNavigate();
  const [{isAdmin, isKitchen}, userDispatch]  = useUserContext();
  const [{cartItems}, cartDispatch]  = useUserContext();
  

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.6 }}
    className="absolute right-0 flex-col hidden rounded-lg shadow-xl group-hover:flex w-54 bg-gray-50 top-16"
  >
    <p className="flex items-center gap-3 px-10 py-2 text-base capitalize transition-all duration-100 ease-in-out bg-slate-100 text-headingColor">
      {user?.displayName || user?.email || 'User'}
    </p>
    {isAdmin && (
      <button
      className="flex items-center gap-3 px-10 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-100 text-textColor"
      onClick={() =>{ ToggleAdminMode(userDispatch, true)
        navigate('/dashboard', { replace: true });
      }}
      >
        Administrator
        <RiAdminLine />
      </button>
    )}
    {isKitchen && (
      <button
      className="flex items-center gap-3 px-10 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-100 text-textColor"
      onClick={() =>{
         ToggleKitchenMode(userDispatch, true)
         navigate('/kitchen', { replace: true });
        }}
      >
        Kitchen
        <PiCookingPot />
      </button>
    )}
    {/* <p
      className="flex items-center gap-3 px-10 py-2 text-base transition-all duration-100 ease-in-out cursor-pointer hover:bg-slate-100 text-textColor"
      onClick={() => logout(user, userDispatch,cartDispatch, navigate)}
    >
      Logout
      <MdLogout />
    </p> */}
  </motion.div>
  )
}

export default Dropdown