import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* This is an example of a remaining navigation item */}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Example Link
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button type="button" className="btn btn-link px-3 me-2">
              Login
            </button>
            <button type="button" className="btn btn-primary me-3">
              Sign up for free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
