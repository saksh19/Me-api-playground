import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="nav-inner">
        {/* Brand / Logo */}
        <Link to="/" className="brand">
          <div className="logo">S</div>
          MyPortfolio
        </Link>

        {/* Navigation links */}
        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Home
          </NavLink>
          <NavLink 
            to="/skills" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Skills
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/admin/login" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
