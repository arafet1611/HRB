import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Components/Navbar";
import { MdNavigateBefore } from "react-icons/md";
import "../Styles/Layout.css";

const Layout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    setIsAdmin(user && user.isAdmin);
  }, []);

  return (
    <>
      <Navbar />

      <div className="layout-container">
        {isAdmin && <Sidebar />}
        <main className="layout-container">{children}</main>
      </div>
    </>
  );
};

export default Layout;
