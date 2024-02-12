import "./App.css";
import { Routes, Route } from "react-router-dom";
import Error404 from "./Componants/Shared/Error404";
import Home from "./Componants/Shared/Home";
import Login from "./Componants/Shared/Login";
import Dashboard from "./Componants/Shared/Dashboard";
import EmpLayout from "./Componants/Employee/EmpLayout";
import MerchLayout from "./Componants/Merchant/MerchLayout";
import OrderList from "./Componants/Orders/OrderList";
import OrderForm from "./Componants/Orders/OrderForm";
import NewPermission from "./Componants/RolesPermissions/NewPermission";
import OrderReport from "./Componants/Orders/OrderReport";
import WeightSettings from "./Componants/Employee/WeightSettings";
import CitiesList from "./Componants/Cities/CitiesList";
import CityForm from "./Componants/Cities/CityForm";
import GovernList from "./Componants/Governates/GovernList";
import GovernForm from "./Componants/Governates/GovernForm";
import BranchesList from "./Componants/Branches/BranchesList";
import BranchForm from "./Componants/Branches/BranchForm";
import NewMerch from "./Componants/NewUser/NewMerch";
import Error500 from "./Componants/Shared/Error500";
import Error403 from "./Componants/Shared/Error403";
import MerOrderList from "./Componants/Merchant/MerOrderList";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />

          <Route path="Employee/:eid" element={<EmpLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="Orders">
              <Route index element={<OrderList />} />
              <Route path="Edit/:oid" element={<OrderForm />} />
              <Route path="Report" element={<OrderReport />} />
            </Route>
            <Route path="NewPermissions" element={<NewPermission />} />
            <Route path="WeightSettings" element={<WeightSettings />} />
            <Route path="Cities">
              <Route index element={<CitiesList />} />
              <Route path="New" element={<CityForm />} />
              <Route path="Edit/:cid" element={<CityForm />} />
            </Route>
            <Route path="Governates">
              <Route index element={<GovernList />} />
              <Route path="New" element={<GovernForm />} />
              <Route path="Edit/:gid" element={<GovernForm />} />
            </Route>
            <Route path="Branches">
              <Route index element={<BranchesList />} />
              <Route path="New" element={<BranchForm />} />
              <Route path="Edit/:bid" element={<BranchForm />} />
            </Route>
            <Route path="Users">
              <Route path="NewUser" element={<NewMerch />} />
            </Route>
          </Route>

          <Route path="Merchant/:mid" element={<MerchLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="Orders" element={<MerOrderList />} />
            <Route path="NewOrder" element={<OrderForm />} />
          </Route>
        </Route>
        <Route path="Forbidden" element={<Error403 />} />
        <Route path="ServerError" element={<Error500 />} />
        <Route path="NotFound" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
