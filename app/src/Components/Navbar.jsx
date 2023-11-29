import React from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const storedUser = window.localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

const Navbar = () => {
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div id="menuHolder">
      <div
        role="navigation"
        className="sticky-top border-bottom border-top"
        id="mainNavigation"
      >
        <div className="flexMain ml-6">
          <div className="el2" id="siteBrand">
            <img src={logo} width={100} height={20} alt="Logo" />
          </div>
          <div className="flex2 text-end d-block d-md-none"></div>
          <div className="flex2 text-end d-none d-md-block">
            {user ? (
              <div>
                <span className="whiteLink-siteLink">
                  Welcome, {`${user.firstName} ${user.lastName} `}
                </span>
                {!user.isAdmin ? (
                  <Link to="/demande" className="whiteLink-siteLink">
                    Send Demande
                  </Link>
                ) : null}
                <button className="whiteLink-siteLink" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
              
                <Link to="/login" className="whiteLink-siteLink">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
