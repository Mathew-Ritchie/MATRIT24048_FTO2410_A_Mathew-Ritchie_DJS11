import React from "react";
import "./Header.css";

const Header = ({ onHamburgerClick }) => {
  return (
    <header className="header">
      <h1>My Application</h1>

      <audio controls></audio>

      {/* 
      <button className="hamburger-button" id="hamburger">
        ☰
      </button> */}
    </header>
  );
};

export default Header;
