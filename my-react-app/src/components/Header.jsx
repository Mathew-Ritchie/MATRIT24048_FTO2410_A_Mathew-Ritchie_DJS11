import React from "react";
import "./Header.css";

const Header = ({ onHamburgerClick }) => {
  return (
    <header className="header">
      <h1>My Application</h1>
      <button className="hamburger-button" onClick={onHamburgerClick}>
        ☰ {/* Hamburger icon */}
      </button>
    </header>
  );
};

export default Header;
