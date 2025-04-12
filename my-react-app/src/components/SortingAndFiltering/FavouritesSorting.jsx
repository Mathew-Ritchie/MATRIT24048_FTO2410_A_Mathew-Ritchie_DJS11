import React from "react";
import "../SortingHeader.css";

export default function FavSortingDropDown({ setSortOption }) {
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <select id="select_zone" className="sorting-dropdown" onChange={handleSortChange}>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
      <option value="Newest">Newest</option>
      <option value="Oldest">Oldest</option>
    </select>
  );
}
