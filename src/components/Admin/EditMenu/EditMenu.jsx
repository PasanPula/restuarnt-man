import { useState, useEffect } from 'react'
import { useMenuContext } from '../../../context/MenuContext/MenuProvider';
import { FaSearch } from "react-icons/fa";
import MenuItem from '../../MenuList/MenuItem';
import MenuUpdateUI from './MenuUpdateUI';
import { fetchMenuData } from '../../../api/api';
import NotFound from '../../NotFound/NotFound';

const EditMenu = () => {

  const [{ menuItems }, dispatch] = useMenuContext();
  const [query, setQuery] = useState("");
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const [showItemEdit,setShowItemEdit] = useState(false);
  const [ currentFoodItem, setCurrentFoodItem ] = useState();

  useEffect(() => {
    fetchMenuData(dispatch);
  }, [])

  useEffect(() => {
    setFilteredMenuItems(menuItems);
  }, [menuItems])

  const filterMenu = (qry) => {
    if(!qry|| qry.length === 0) {
        setFilteredMenuItems(menuItems);
    }else{
      const filteredMenuItems = menuItems.filter((menuItem) => menuItem.title.toLowerCase().includes(qry.toLowerCase()));
      setFilteredMenuItems(filteredMenuItems);
    }
}

const searchFood = (e) => {
    setQuery(e.target.value);
    filterMenu(e.target.value);
}

  return (
    <>
    {showItemEdit ? <MenuUpdateUI currentFoodItem={currentFoodItem} setShowItemEdit={setShowItemEdit} /> : 
    <div className="flex flex-col justify-center w-full">
      {/* search bar */}
      <div className="flex justify-center w-full p-2 mb-4 bg-white rounded-lg">
        <input
          className="w-full p-2 rounded-lg outline-none "
          type="text"
          placeholder="Search Dish ID"
          value={query}
          onChange={(e) => searchFood(e)}
        />
        {/* search button */}
        <button className="flex items-center justify-center gap-3 px-4 py-2 font-bold text-orange-700 rounded-lg">
          <FaSearch />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center w-full gap-3 overflow-x-hidden">
        { filteredMenuItems.length ?
            filteredMenuItems.map((item,index) => (
                <MenuItem key={index} item={item} setShowItemEdit={setShowItemEdit} setCurrentFoodItem={setCurrentFoodItem} col  />
            )) :
            <NotFound text="No Dishes Available" />
        }
      </div>
    </div> 
  }
  </>
  )
}

export default EditMenu