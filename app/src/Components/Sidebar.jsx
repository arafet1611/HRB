import React, { useRef } from "react";
import { Link } from "react-router-dom";
// React Icons
import { RxDashboard } from "react-icons/rx";
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
          <div className="ham-btn" onClick={(e) => mobileMenuShow(e)}>
            <AiOutlineMenu />
          </div>
        </div>
        <div
          className={`col-md-12 dashboard-sidebar-nav dashboard-sidebar-nav-${themeColor}`}
          ref={mobileSidebarNav}
        >
          <ul className="navbar">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <MdDashboardCustomize /> &nbsp; &nbsp;<span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employees">
                <MdCalendarToday /> &nbsp; &nbsp;<span>Employee List</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <MdOutlineTopic /> &nbsp; &nbsp;<span>About</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
