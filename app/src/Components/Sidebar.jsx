import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import {
  MdDashboardCustomize,
  MdCalendarToday,
  MdOutlineTopic,
  MdHistory,
} from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import "../Styles/Sidebar.css";

const SideBar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div
      className={`dashboard-sidebar vh-md-100 ${
        sidebarVisible ? "visible" : ""
      }`}
    >
      <div className="row">
        <div className="col-md-12 py-3 mobile-sidebar-nav">
          <div
            className="ham-btn"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            <AiOutlineMenu />
          </div>
        </div>
        <div
          className={`col-md-12 dashboard-sidebar-nav dashboard-sidebar-nav-white`}
        >
          <ul className="navbar">
            <div>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <MdDashboardCustomize /> &nbsp; &nbsp;
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employees">
                  <MdCalendarToday /> &nbsp; &nbsp;
                  <span>Employee List</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <MdOutlineTopic /> &nbsp; &nbsp;<span>About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">
                  <MdHistory /> &nbsp; &nbsp;<span>History </span>
                </Link>
              </li>
              <li className="nav-item" onClick={handleLogout}>
                <Link className="nav-link">
                  <TbLogout2 /> &nbsp; &nbsp;<span>Logout</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
