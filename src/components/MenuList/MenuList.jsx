import {useState, useEffect} from 'react'
import { motion } from "framer-motion";
import { BiRestaurant } from "react-icons/bi";
import MenuButton from './MenuButton';
import { MenuCategories } from '../../configs/Constants/MenuCategories';
import MenuContainer from './MenuContainer';
import { useMenuContext } from '../../context/MenuContext/MenuProvider';
import { FilterMenu } from '../../util/filters';
import { fetchMenuData } from '../../api/api';

const MenuList = () => {

  const [filter, setFilter] = useState("all");
  const [scrollValue, setScrollValue] = useState(0);
  const [{ menuItems }, dispatch] = useMenuContext();

  return (
    <section className="w-full my-5" id="menu">
      
      <div className="flex items-center justify-center w-full">
          <p className={`text-2xl text-headingColor font-semi-bold capitalize relative before:absolute before:rounded before:content before:w-80 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100`}>
            Sri Lankan Spice Hot Menu
         </p>
      </div>
      

      <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`w-full py-10 flex items-center justify-start lg:justify-center  h-auto gap-4 md:gap-8  px-2  overflow-x-scroll scrollbar-hidden  scroll-smooth`}
    >
      <MenuButton category={{id: 666, name: "Menu", urlParam: "all", icon: <BiRestaurant />}} filter = {filter} setFilter = {setFilter} />
        {
            MenuCategories.map((category,index) =>{
                return <MenuButton key = {index} category = {category} filter = {filter} setFilter = {setFilter} />
            })
        }
    </motion.div>


      <MenuContainer
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={filter === "all" ? menuItems : FilterMenu(filter)}
      />
    </section>
  )
}

export default MenuList