import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import KitchenSideNav from '../../components/Kitchen/KitchenSideNav/KitchenSideNav';
import { useUserContext } from '../../context/UserContext/UserProvider';
import KitchenDashBoardBody from '../../components/Kitchen/KitchenDashBoardBody/KitchenDashBoardBody';
import OrdersList from '../../components/Kitchen/OrderList/OrdersList';
import { getOrders } from '../../util/utilFunctions';
import { useOrderContext } from '../../context/OrderContext/OrderProvider';

export const Kitchen = () => {

const [activePage, setActivePage] = useState("Pending");
const [element, setElement] = useState(<OrdersList/>);
const [showMobileSideNav, setshowMobileSideNav] = useState(false);
const [{ isKitchen, kitchenMode}, userDispatch] = useUserContext();
const [{ orders}, orderDispatch] = useOrderContext();
const navigate = useNavigate();
const effectRan = useRef(false)

useEffect(() => {
  if(!(isKitchen && kitchenMode)) {
    navigate("/");
  }

  if(effectRan.current === false){
    getOrders(orderDispatch);
    effectRan.current = true;
    console.log('effect ran');
  }

}, [])

  return (
    <>
    <div className="flex items-start w-full h-screen gap-2">
    <KitchenSideNav showMobileSideNav={showMobileSideNav} setshowMobileSideNav={setshowMobileSideNav}  activePage={activePage} setActivePage={setActivePage} setPageContent = {setElement} />
    <KitchenDashBoardBody setshowMobileSideNav={setshowMobileSideNav} pageTitle={activePage} Element = {element} />
    </div> 
   </>
  )
}
