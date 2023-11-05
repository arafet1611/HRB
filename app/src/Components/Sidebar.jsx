import React, { useRef } from "react";
import { Link } from "react-router-dom";
// React Icons
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import {
  MdDashboardCustomize,
  MdCalendarToday,
  MdOutlineTopic,
  MdPieChart,
  MdBarChart,
  MdSource,
  MdOutlineFlag,
  MdOutlineSettings,
  MdEdit,
} from "react-icons/md";
import { AiOutlineAreaChart, AiOutlineMenu } from "react-icons/ai";

import "../Styles/SideBar.css";

const SideBar = ({ themeColor }) => {
  const mobileSidebarNav = useRef(null);

  const mobileMenuShow = (e) => {
    e.preventDefault();
    mobileSidebarNav.current.classList.toggle("dashboard-sidebar-nav-show");
  };

  const user = JSON.parse(window.localStorage.getItem("user"));

  const handleLogout = () => {
    // Remove the user from local storage and redirect to the login page
    window.localStorage.removeItem("user");
    window.location.href = "/login"; // You can replace this with the correct URL for the login page
  };

  return (
    <div className="dashboard-sidebar vh-md-100">
      <div className="row">
        <div className="col-md-12 py-3 mobile-sidebar-nav">
          <div className="dashboard-logo pr-center">
            <RxDashboard />
            &nbsp;
            <span>
              My<strong className="dash-logo-color">Dashboard</strong>
            </span>
          </div>
          <div className="ham-btn" onClick={mobileMenuShow}>
            <AiOutlineMenu />
          </div>
        </div>
        <div
          className={`col-md-12 dashboard-sidebar-nav dashboard-sidebar-nav-${themeColor}`}
          ref={mobileSidebarNav}
        >
          <ul className="navbar">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <MdDashboardCustomize /> &nbsp; &nbsp;<span>Login</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <MdDashboardCustomize /> &nbsp; &nbsp;<span>SignUp</span>
                  </Link>
                </li>
              </>
            ) : user.isAdmin ? (
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
                <li className="nav-item" onClick={handleLogout}>
                  <Link className="nav-link">
                    <TbLogout2 /> &nbsp; &nbsp;<span>Logout</span>
                  </Link>
                </li>
              </div>
            ) : (
              <>
                <li className="nav-item" onClick={handleLogout}>
                  <Link className="nav-link">
                    <TbLogout2 /> &nbsp; &nbsp;<span>Logout</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
