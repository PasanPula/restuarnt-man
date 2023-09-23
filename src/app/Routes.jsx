import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import { Kitchen } from "../pages/kitchen/Kitchen";
import Orders from "../pages/orders/Orders";

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={ <RootLayout /> }>
        <Route index element={ <Home/> }></Route>
        <Route path="/login" element={ <Login/> }></Route>
        <Route path="/register" element={ <Register/> }></Route>
        <Route path="/dashboard" element={ <Dashboard/> }></Route>
        <Route path="/kitchen" element={ <Kitchen/> }></Route>
        <Route path="/orders" element={ <Orders/> }></Route>
      </Route>
));

export default router;