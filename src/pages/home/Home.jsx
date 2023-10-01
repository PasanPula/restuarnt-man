import {useEffect } from 'react'
import MenuList from '../../components/MenuList/MenuList'
import { useMenuContext } from '../../context/MenuContext/MenuProvider'
import { fetchMenuData } from '../../api/api';

const Home = () => {

  const [{ menuItems }, dispatch] = useMenuContext();

  useEffect(() => {
    fetchMenuData(dispatch)
  }, [])
  
  return (
    <div className='flex flex-col items-center justify-center w-full h-auto'>
      {/* In Components -> MenuList Folder -> MenuList.jsx */}
      <MenuList  />
    </div>
  )
}

export default Home