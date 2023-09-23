import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stat from '../../components/Stats/Stat';
import SideNav from '../../components/Admin/SideNav/SideNav';
import DashBoardBody from '../../components/Admin/DashboardBody/DashBoardBody';
import Home from '../home/Home';
import { useUserContext } from '../../context/UserContext/UserProvider';
import { UserTypes } from '../../configs/Constants/ActionTypes';

const Dashboard = () => {

const [activePage, setActivePage] = useState("Dashboard");
const [element, setElement] = useState(<Stat/>);
const [showMobileSideNav, setshowMobileSideNav] = useState(false);
const [{ isAdmin, adminMode}, userDispatch] = useUserContext();
const navigate = useNavigate();

useEffect(() => {
  if( !(isAdmin && adminMode)) {
    navigate("/");
  }
}, [])


  return (
    <>
     <div className="flex items-start w-full h-screen gap-2">
     <SideNav showMobileSideNav={showMobileSideNav} setshowMobileSideNav={setshowMobileSideNav}  activePage={activePage} setActivePage={setActivePage} setPageContent = {setElement} />
     <DashBoardBody setshowMobileSideNav={setshowMobileSideNav} pageTitle={activePage} Element = {element} />
     </div> 
    </>
  )
}

export default Dashboard