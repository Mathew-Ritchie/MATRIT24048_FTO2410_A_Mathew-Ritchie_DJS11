import React, { useContext } from "react";
import "./Header.css";
import { AudioContext } from "../AudioContext/AudioContext";

const Header = ({ onHamburgerClick }) => {
  const { AudioUrl } = useContext(AudioContext);

  return (
    <header className="header">
      <h1>My Application</h1>
      {AudioUrl && <div className="audio-container" data-audio-url={AudioUrl}></div>}
    </header>
  );
};

export default Header;
