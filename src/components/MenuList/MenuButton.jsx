import React from 'react'
import { motion } from "framer-motion";
import { MdOutlineFastfood } from "react-icons/md";

const MenuButton = ({category, filter, setFilter}) => {
  return (
    <motion.div
    onClick={() => setFilter(category.urlParam)}
    whileTap={{ scale: 1.1 }}
    className={`group ${
      category.urlParam === filter
        ? "hover:bg-btnOverlay bg-primeGold"
        : "bg-btnOverlay hover:bg-primeGold"
    } w-24 min-w-[6rem] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all  ease-out`}
  >
    <div
      className={`w-10 h-10 rounded-full ${
        category.urlParam === filter
          ? "group-hover:bg-primeGold bg-btnOverlay"
          : "bg-primeGold group-hover:bg-btnOverlay"
      }  flex items-center justify-center`}
    >

      <span
        className={`${
          category.urlParam === filter
            ? "text-textColor group-hover:text-btnOverlay"
            : "group-hover:text-textColor text-btnOverlay"
        } text-lg`}
      >
        {category.icon || <MdOutlineFastfood />}
      </span>
    </div>
    <p
      className={`text-base ${
        category.urlParam === filter
          ? "group-hover:text-textColor text-white"
          : "text-textColor group-hover:text-white"
      } `}
    >
      {category.name}
    </p>
  </motion.div>
  )
}

export default MenuButton