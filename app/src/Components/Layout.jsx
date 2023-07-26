import React from "react";
import Sidebar from "./Sidebar";
import "../Styles/Layout.css";
import Dashboard from "../Pages/Dashboard";
import EmployeesList from "../Pages/EmployeesList";
const Layout = () => {
  return (
    <>
      <div className="layout-container">
        <Sidebar />
        <EmployeesList />
      </div>
    </>
  );
};

export default Layout;
