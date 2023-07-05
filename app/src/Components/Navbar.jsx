import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; 
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
           <Link to="/login">Login</Link>
        </li>
        <li>
           <Link to="/register">SignUp</Link>
        </li>
        <li>
           <Link to="/">Dashboard</Link>
        </li>
        <li>
           <Link to="/about">About</Link>
        </li>
        <li>
           <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar