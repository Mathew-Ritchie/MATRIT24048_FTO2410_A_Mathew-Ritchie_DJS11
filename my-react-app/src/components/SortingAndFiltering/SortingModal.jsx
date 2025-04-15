import React from "react";
import GenreDropDown from "./GenreDropDown";
import SearchInput from "./SearchInput";
import SortingDropDown from "./SortingDropDown";
import "./sorting-modal.css";

export default function SortingModal() {
  return (
    <div className="sorting-modal">
      <SearchInput className="search-input-modal" />
      <GenreDropDown className="genre-dropdonw-modal" />
      <SortingDropDown className="sorting-dropdown-modal" />
    </div>
  );
}
