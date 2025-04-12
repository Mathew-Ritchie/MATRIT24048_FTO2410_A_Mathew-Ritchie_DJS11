import React from "react";
import GenreDropDown from "./SortingAndFiltering/GenreDropDown";
import SearchInput from "./SortingAndFiltering/SearchInput";
import SortingDropDown from "./SortingAndFiltering/SortingDropDown";
import "./MainSortingHeaders.css";

export default function SortingHeader() {
  return (
    <nav className="show-nav">
      <SearchInput />
      <GenreDropDown />
      <SortingDropDown />
    </nav>
  );
}
