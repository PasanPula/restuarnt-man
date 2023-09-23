import React from 'react';
import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import MenuItem from './MenuItem';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';

const MenuContainer = ({scrollOffset, col, items, className }) => {

   const containerRef = useRef(null);
    useLayoutEffect(() => {
      if(null !== containerRef.current){
        containerRef.current.scrollLeft += scrollOffset
      }
    }, [scrollOffset]);
    // const [{user}, dispatch] = useStateValue();

  return (
    <motion.div
    ref = {containerRef}
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
    className={`${className} w-full my-12 flex items-center ${(!items || col) && "justify-center"}   min-h-[200px] gap-4  px-2 ${
      !col ? "overflow-x-scroll scrollbar-hidden scroll-smooth" : "overflow-x-hidden flex-wrap"
    }`}
  >
    {items  && items.map((item) => (
      <MenuItem key={item.id} item = {item} col = {col} admin = {
        // isAdmin(user)  
        false
     }/>
    ))}
    {
      !items && (!col ? (<Loader progress = {"Fetching Food Items....."} />): (<NotFound text="Fetching Food Items..."  />))
    }
    {
      items && items.length <= 0 &&  (<NotFound text="No Food Items Available "  />)
    }
  </motion.div>
  )
}

export default MenuContainer