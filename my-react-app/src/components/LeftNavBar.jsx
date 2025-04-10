import React from "react";
import "./LeftNavBar.css";

const LeftNavBar = ({ children, onButtonClick1, onButtonClick2 }) => {
  return (
    <nav className="left-nav-bar">
      {/* <div> */}
      <button className="nav-button" onClick={onButtonClick1}>
        Button 1
      </button>
      <button className="nav-button" onClick={onButtonClick2}>
        Button 2
      </button>
      {/* </div> */}
      {/* <div>
        <audio controls src=""></audio>
      </div> */}
    </nav>
  );
};

export default LeftNavBar;
