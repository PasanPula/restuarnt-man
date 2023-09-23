import { useState } from 'react'
import { useMenuContext } from '../../../context/MenuContext/MenuProvider';
import { FaSearch } from "react-icons/fa";
import MenuItem from '../../MenuList/MenuItem';

const EditMenu = () => {

  const [{ menuItems }] = useMenuContext();
  const [query, setQuery] = useState("");
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);

  const filterMenu = () => {
    if(query.length === 0) {
        setFilteredMenuItems(menuItems);
    }else{
      const filteredMenuItems = menuItems.filter((menuItem) => menuItem.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredMenuItems(filteredMenuItems);
    }
}

const searchFood = (e) => {
    setQuery(e.target.value);
    filterMenu();
}

  return (
    <div className="w-full flex flex-col justify-center">
      {/* search bar */}
      <div className="w-full flex justify-center p-2 bg-white mb-4 rounded-lg">
        <input
          className="w-full p-2 outline-none rounded-lg "
          type="text"
          placeholder="Search food"
          value={query}
          onChange={(e) => searchFood(e)}
        />
        {/* search button */}
        <button className="flex items-center justify-center gap-3 text-orange-700 font-bold py-2 px-4 rounded-lg">
          <FaSearch />
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
        {
            filteredMenuItems.map((item) => (
                <MenuItem key={item.id} item={item} col admin />
            ))
        }
      </div>
    </div>
  )
}

export default EditMenu