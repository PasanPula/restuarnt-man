import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Stat from "../../components/Stats/Stat";
import SideNav from "../../components/Admin/SideNav/SideNav";
import DashBoardBody from "../../components/Admin/DashboardBody/DashBoardBody";
import Home from "../home/Home";
import { useUserContext } from "../../context/UserContext/UserProvider";
import { UserTypes } from "../../configs/Constants/ActionTypes";
import { useOrderContext } from "../../context/OrderContext/OrderProvider";
import { fetchOrders } from "../../api/api";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [element, setElement] = useState(<Stat />);
  const [showMobileSideNav, setshowMobileSideNav] = useState(false);
  const [{ isAdmin, adminMode }, userDispatch] = useUserContext();
  const [{ orders }, orderDispatch] = useOrderContext();
  const navigate = useNavigate();
  const effectRan = useRef(false);

  useEffect(() => {
    if (!(isAdmin && adminMode)) {
      navigate("/");
    }

    if (effectRan.current === false) {
      (async () => {
        await fetchOrders(orderDispatch);
      })();
      effectRan.current = true;
    }
  }, []);

  return (
    <>
      {/* Admin Dashboard */}
      <div className="flex items-start w-full h-screen gap-2">
        {/* Sidebar of the Admin Page - Components -> Admin -> SideNav -> SideNav.jsx  */}
        <SideNav
          showMobileSideNav={showMobileSideNav}
          setshowMobileSideNav={setshowMobileSideNav}
          activePage={activePage}
          setActivePage={setActivePage}
          setPageContent={setElement}
        />
        {/* Render the Suitable page acroding to slectd page on the side bar - Compoents -> Admin -> DashBoardBody -> DashboardBaody.jsx*/}
        <DashBoardBody
          setshowMobileSideNav={setshowMobileSideNav}
          pageTitle={activePage}
          Element={element}
        />
      </div>
    </>
  );
};

export default Dashboard;
