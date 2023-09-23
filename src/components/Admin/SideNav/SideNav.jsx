import { useNavigate } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext/UserProvider';
import { ToggleAdminMode } from '../../../util/utilFunctions';
import SideNavMenu from './SideNavMenu';
import { logout } from '../../../util/utilFunctions';
import { MdOutlineRestaurantMenu } from "react-icons/md";




const SideNav = ({activePage,setActivePage,setPageContent, showMobileSideNav, setshowMobileSideNav}) => {

    const [{ user,adminMode }, userDispatch] = useUserContext();
    const navigate = useNavigate();

  return (
    <div className={` md:flex flex-col ${showMobileSideNav ? 'absolute z-50 backdrop-blur-sm flex' : " hidden " }  w-full md:backdrop-blur-none md:relative md:w-[20%] bg-orange-600 text-orange-50 px-3 py-4 justify-center items-center h-full`} >
    
    <motion.div
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="relative flex items-center justify-end w-full text-textColor md:hidden"
        onClick={() => setshowMobileSideNav(false)}
      >
        <MdOutlineRestaurantMenu className="text-4xl text-orange-50" />
      </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      whileHover = {{scale:1.1}}
      className=""
    >
      <Link
        onClick={() => ToggleAdminMode(userDispatch, false)}
        to={"/"}
        className="flex items-center justify-center w-full pb-8 ml-1"
      >
        <p className="pl-1 text-xl font-bold text-center no-underline text-orange-50 hover:text-orange-100">
         River&apos;s&nbsp;Edge <br/>Administrator
        </p>
      </Link>
    </motion.div>

    <SideNavMenu
      activePage={activePage}
      setActivePage={setActivePage}
      setPageContent={setPageContent}
      setshowMobileSideNav={setshowMobileSideNav}
    />

    <motion.div
      whileHover = {{scale:1.1}}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      onClick={() => logout(user, userDispatch, navigate)}
      className="flex items-center justify-center gap-3 px-3 mt-auto cursor-pointer text-orange-50 opacity-70 hover:opacity-100"
    >
      <AiFillLock className="text-xl font-bold text-orange-50" />
      <div className="">Logout</div>
    </motion.div>

   
  </div>
  )
}

export default SideNav