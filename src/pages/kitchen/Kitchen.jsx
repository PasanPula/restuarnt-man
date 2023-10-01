import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import KitchenSideNav from '../../components/Kitchen/KitchenSideNav/KitchenSideNav';
import { useUserContext } from '../../context/UserContext/UserProvider';
import KitchenDashBoardBody from '../../components/Kitchen/KitchenDashBoardBody/KitchenDashBoardBody';
import OrdersList from '../../components/Kitchen/OrderList/OrdersList';
import { useOrderContext } from '../../context/OrderContext/OrderProvider';
import Loader from '../../components/Loader/Loader';
import { fetchOrders } from '../../api/api';

export const Kitchen = () => {

const [activePage, setActivePage] = useState("Pending");
const [element, setElement] = useState(<OrdersList/>);
const [showMobileSideNav, setshowMobileSideNav] = useState(false);
const [{ isKitchen, kitchenMode}, userDispatch] = useUserContext();
const [{ orders}, orderDispatch] = useOrderContext();
const [showLoader,setShowLoader] = useState(true);
const navigate = useNavigate();
const effectRan = useRef(false);

useEffect(() => {
  setShowLoader(true);
  if(!(isKitchen && kitchenMode)) {
    navigate("/");
  }

  if(effectRan.current === false){
    (async () => {
      await fetchOrders (orderDispatch);
      setShowLoader(false);
    })()
    effectRan.current = true;
  }

}, [])

  return (
    <>
    {/* Kitchen page */}
    <div className="flex items-start w-full h-screen gap-2">
        {/* Sidebar of the Kitchen Page - Components -> Kitchen -> KitchenSideNav -> KithcenSideNav.jsx  */}
    <KitchenSideNav showLoader={showLoader} showMobileSideNav={showMobileSideNav} setshowMobileSideNav={setshowMobileSideNav}  activePage={activePage} setActivePage={setActivePage} setPageContent = {setElement} />
 {/* Render the orders accroding to selcted Order staus types -  Components -> Kitchen -> KitchenSideNav -> KitchenSideNavBody -> KitchenSideNavBody.jsx */}
    <KitchenDashBoardBody showLoader={showLoader} setshowMobileSideNav={setshowMobileSideNav} pageTitle={activePage} Element = {element} />
    </div> 
   </>
  )
}
