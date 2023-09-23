import React from 'react'
import { Link } from "react-router-dom";
import { ToggleAdminMode, ToggleKitchenMode } from '../../../util/utilFunctions';
import { useUserContext } from '../../../context/UserContext/UserProvider';
import { MdHome } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { motion } from 'framer-motion';

const KitchenDashBoardBody = ({ pageTitle, Element, setshowMobileSideNav }) => {

  const [{user}, userdispatch] = useUserContext()

  return (
    <div className="flex flex-col w-full md:w-[80%] h-screen px-2">
    <div className="flex justify-between w-full px-6 pt-6 pb-2 text-xl font-bold text-gray-600 border-b-2 border-orange-200">
      <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center md:hidden"
              onClick={() => setshowMobileSideNav(true)}
            >
              <HiOutlineMenuAlt2 className="text-4xl text-headingColor" />
      </motion.div>
       <div className='text-center ' >{pageTitle} Orders</div>
      {/* home button */}
      <Link to="/" onClick={() => ToggleKitchenMode(userdispatch, false)}>
        <button className="flex items-center justify-center gap-3 font-bold text-orange-700 rounded-lg ">
          <MdHome className="text-4xl" />
        </button>
      </Link>
    </div>
    <div className="flex-1 mx-6 my-2 overflow-y-scroll border-8 border-gray-200 border-dotted rounded-xl">{Element}</div>
  </div>
  )
}

export default KitchenDashBoardBody