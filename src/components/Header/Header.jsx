import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from './Navigation';
import LoginAction from './LoginAction';
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Dropdown from './Dropdown';
import MobileNav from './MobileNav';
import { useUserContext } from '../../context/UserContext/UserProvider';
import Avatar from '../../assets/avatar.png'
import logo from '../../assets/logo2.png'

const Header = () => {

 const [isOpen, setIsOpen] = useState(false);
 const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
 const [{ user }, userDispatch] = useUserContext()

  return (
    <header className="fixed z-50 w-screen bg-containerbg backdrop-blur-md md:p-3 md:px-4 lg:p-6 lg:px-16">
        {/* Tablet and Desktop */}
      <div className="justify-between hidden w-full md:flex itesm-center">
        <Link to={"/"}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img className='w-[30%] ' src={logo}></img>
            {/* <p className="font-bold text-headingColor md:text-lg lg:text-xl">
            River&apos;s&nbsp;Edge
            </p> */}
          </motion.div>
        </Link>

        <div className='flex flex-row gap-3 ' >
        <Navigation/>


         {/* {user ? ( */}
          <div className={`group flex items-center gap-3 px-3 py-1 rounded-lg`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center "
            >
              <img
                src={user?.photoURL || Avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer object-contain"
                alt="profile"
              />
              <p className="flex items-center justify-center gap-2 cursor-pointer text-headingColor">
                <RiArrowDropDownLine />
              </p>
            </motion.div>
            <Dropdown user={user} />
          </div>
        {/* // ) : (
        //   <LoginAction text={"Login"} />
        //  )} */}
         </div>


        </div>


         {/* Mobile */}
      <motion.div
        className="flex items-center justify-between w-full p-0 md:hidden"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        {isOpenMobileNav ? (
          <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav} />
        ) : (
          <div className="flex items-center justify-between w-full p-5">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center "
              onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
            >
              <HiOutlineMenuAlt2 className="text-4xl text-headingColor" />
            </motion.div>
            <Link to={"/"}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 cursor-pointer"
              > 
                <p className="text-xl font-bold text-headingColor">
                    River&apos;s&nbsp;Edge
                </p>
              </motion.div>
            </Link>
            {/* {user ? ( */}
              <div
                className={`flex items-center gap-3 px-3 py-1 rounded-lg relative`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center group"
                >
                  <img
                    src={user?.photoURL ? user.photoURL : Avatar}
                    className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
                    alt="user-profile"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <p className="flex items-center justify-center gap-2 cursor-pointer text-headingColor">
                    <RiArrowDropDownLine />
                  </p>
                  {isOpen && <Dropdown user={user}  />}
                </motion.div>
              </div>
            {/* ) : (
              <LoginAction mobile />
            )} */}
          </div>
        )}
      </motion.div>
    </header>
  )
}

export default Header