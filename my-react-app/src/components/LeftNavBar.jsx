import React from "react";
import "./LeftNavBar.css";
import { NavLink } from "react-router";

const LeftNavBar = ({ children, onButtonClick1, onButtonClick2 }) => {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "white",
    backgroundColor: "#495057",
  };

  return (
    <nav className="left-nav-bar">
      {/* <div> */}
      <NavLink
        to={"/"}
        className="left-navbar-btn-link"
        style={({ isActive }) => (isActive ? activeStyles : null)}
      >
        Home
      </NavLink>
      <NavLink
        to={`/favourites`}
        className="left-navbar-btn-link"
        style={({ isActive }) => (isActive ? activeStyles : null)}
      >
        Favourites
      </NavLink>
    </nav>
  );
};

export default LeftNavBar;
