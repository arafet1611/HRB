import React from "react";
import Sidebar from "./Sidebar";
import "../Styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout-container">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
