import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom"; 
import {
  MdDashboardCustomize,
  MdCalendarToday,
  MdOutlineTopic,
  MdHistory,
  MdDateRange 
} from "react-icons/md";
import "../Styles/Sidebar.css";
const storedUser = window.localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

const SideBar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {user ? (
        <>
          {user.isAdmin ? (
            <div className="row">
           
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
                      <Link className="nav-link" to="/demandelist">
                        <MdDateRange /> &nbsp; &nbsp;<span>Demande list </span>
                      </Link>
          </li> 
                    <li className="nav-item">
                      <Link className="nav-link" to="/history">
                        <MdHistory /> &nbsp; &nbsp;<span>History </span>
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          ) : (
            <div className="row">
           
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
                      <Link className="nav-link" to="/historiqueDem">
                        <MdCalendarToday /> &nbsp; &nbsp;
                        <span>history demande </span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">
                        <MdOutlineTopic /> &nbsp; &nbsp;<span>About</span>
                      </Link>
                    </li>
                   
                  </div>
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default SideBar;
