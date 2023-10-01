import { useNavigate } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext/UserProvider';
import { ToggleAdminMode, ToggleKitchenMode } from '../../../util/utilFunctions';
import SideNavMenu from './KitchenSideNavMenu';
import { logout } from '../../../util/utilFunctions';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import logo from '../../../assets/logo2.png'


const KitchenSideNav = ({showLoader,activePage,setActivePage,setPageContent, showMobileSideNav, setshowMobileSideNav}) => {

    const [{ user,adminMode }, userDispatch] = useUserContext();
    const navigate = useNavigate();

  return (
    <>
    {/* Render the kitchen Page Nav Bar */}
    { showLoader ? 
    // Skelton Loader
      <div className={`md:flex flex-col ${showMobileSideNav ? 'absolute z-50 backdrop-blur-sm flex' : " hidden "} w-full md:relative md:w-[20%] bg-sideBarGold text-orange-50 px-3 py-4 justify-center items-center h-full`}>
        <div className="relative flex items-center justify-end w-full text-textColor md:hidden">
          <Skeleton width={50} height={50} /> {/* Placeholder for icon */}
        </div>
        <div>
          <Skeleton width={100} height={20} /> {/* Placeholder for the app name */}
        </div>
        <div>
        <div
        className="flex items-center p-3 no-underline rounded-md cursor-pointer text-orange-50 hover:bg-primeGoldDark"
      >
        <Skeleton width={30} height={30} style={{ marginRight: '10px' }} /> {/* Placeholder for icon */}
        <div className="flex items-center justify-between flex-1 gap-10 pl-3 font-bold">
          <Skeleton width={100} height={20} /> {/* Placeholder for title */}
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-cartNumBg">
            <Skeleton width={20} height={20} /> {/* Placeholder for item count */}
          </div>
        </div>
      </div>
      <div
        className="flex items-center p-3 no-underline rounded-md cursor-pointer text-orange-50 hover:bg-primeGoldDark"
      >
        <Skeleton width={30} height={30} style={{ marginRight: '10px' }} /> {/* Placeholder for icon */}
        <div className="flex items-center justify-between flex-1 gap-10 pl-3 font-bold">
          <Skeleton width={100} height={20} /> {/* Placeholder for title */}
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-cartNumBg">
            <Skeleton width={20} height={20} /> {/* Placeholder for item count */}
          </div>
        </div>
      </div>
      <div
        className="flex items-center p-3 no-underline rounded-md cursor-pointer text-orange-50 hover:bg-primeGoldDark"
      >
        <Skeleton width={30} height={30} style={{ marginRight: '10px' }} /> {/* Placeholder for icon */}
        <div className="flex items-center justify-between flex-1 gap-10 pl-3 font-bold">
          <Skeleton width={100} height={20} /> {/* Placeholder for title */}
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-cartNumBg">
            <Skeleton width={20} height={20} /> {/* Placeholder for item count */}
          </div>
        </div>
      </div>
      <div
        className="flex items-center p-3 no-underline rounded-md cursor-pointer text-orange-50 hover:bg-primeGoldDark"
      >
        <Skeleton width={30} height={30} style={{ marginRight: '10px' }} /> {/* Placeholder for icon */}
        <div className="flex items-center justify-between flex-1 gap-10 pl-3 font-bold">
          <Skeleton width={100} height={20} /> {/* Placeholder for title */}
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-cartNumBg">
            <Skeleton width={20} height={20} /> {/* Placeholder for item count */}
          </div>
        </div>
      </div>
        </div>
        <div className="flex items-center justify-center gap-3 px-3 mt-auto cursor-pointer text-orange-50 opacity-70 hover:opacity-100">
          <Skeleton width={30} height={30} /> {/* Placeholder for logout icon */}
          <div className="w-20">
            <Skeleton width={50} height={20} /> {/* Placeholder for logout text */}
          </div>
        </div>
      </div> :
    // Kitchen side Nav bar
    <div className={` md:flex flex-col ${showMobileSideNav ? 'absolute z-50 backdrop-blur-sm flex' : " hidden " }  w-full md:backdrop-blur-none md:relative md:w-[20%] bg-sideBarGold text-orange-50 px-3 py-4 justify-center items-center h-full`} >
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

{/* Side bar header Section logo & title */}
      <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      whileHover = {{scale:1.1}}
      className=""
    >
      <Link
        onClick={() => ToggleKitchenMode(userDispatch, false)}
        to={"/"}
        className="flex flex-col items-center justify-center w-full pb-8 ml-1"
      >
         <img className='w-[60%] ' src={logo}></img>
         <br/>
        <p className="pl-1 text-xl font-bold text-center text-black no-underline hover:text-sideBarGoldActive">
         Kitchen
        </p>
      </Link>
    </motion.div>

{/* Render Side bar Nav Items */}
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
      className="flex items-center justify-center gap-3 px-3 mt-auto text-black cursor-pointer opacity-70 hover:opacity-100"
    >
      <AiFillLock className="text-xl font-bold text-black" />
      <div className="">Logout</div>
    </motion.div>

   
  </div> 
  }
  </>
  )
}

export default KitchenSideNav