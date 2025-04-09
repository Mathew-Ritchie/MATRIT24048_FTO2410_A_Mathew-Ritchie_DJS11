import React from "react";
import "./Header.css";
import GenreDropDown from "./GenreDropDown";
import usePodcastStore from "../customHooks/usePodcastStore";

const Header = ({ onHamburgerClick }) => {
  const { setSortOption, setSearchInputValue } = usePodcastStore();

  const handleInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <header className="header">
      <h1>My Application</h1>
      <input
        id="search-input"
        type="text"
        placeholder="seach for show"
        onChange={handleInputChange}
      />
      <GenreDropDown />
      <select id="select_zone" onChange={handleSortChange}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Newest update">Newest update</option>
        <option value="Oldest update">Oldest update</option>
      </select>
      <button className="hamburger-button" id="hamburger">
        ☰
      </button>
    </header>
  );
};

export default Header;
