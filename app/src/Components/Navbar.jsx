import React from "react";
import "../Styles/Navbar.css";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
const storedUser = window.localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
console.log(user);
const Navbar = () => {
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <>
      <div id="menuHolder">
        <div
          role="navigation"
          className="sticky-top border-bottom border-top"
          id="mainNavigation"
        >
          <div className="flexMain ml-6">
            <span>
              <RxDashboard className="el1 mb-2 mr-1" />
            </span>
            <div className="el2" id="siteBrand">
              MY AWESOME SITE
            </div>

            <div className="flex2 text-end d-block d-md-none">
              <button className="whiteLink siteLink">
                <i className="fas fa-search"></i>
              </button>
            </div>
            {!user ? (
              <div className="flex2 text-end d-none d-md-block">
                <Link className="whiteLink siteLink2" to={"/register"}>
                  REGISTER
                </Link>
                <Link className="blackLink siteLink2" to={"/login"}>
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex2 text-end d-none d-md-block">
                {" "}
                <img src={user.image} /> {user.firstName} {user.lastName}
                <Link className="BlackLink siteLink2" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
