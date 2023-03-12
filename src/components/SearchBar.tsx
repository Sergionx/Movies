import React, { useState } from "react";
import searchIcon from "../assets/icons/search.svg";

interface SearchBarProps {
  handleSearch: (value: string) => void;
  searchValue: string;
}

function SearchBar(props: SearchBarProps) {


  return (
    <div
      className="bg-white w-full rounded-lg p-2 h-12 flex items-center 
      focus-within:ring-2 focus-within:ring-primary
      "
    >
      <input
        className="bg-transparent w-full h-full outline-none text-lg"
        type="text"
        placeholder="Search for a movie"
        value={props.searchValue}
        onChange={(e) => props.handleSearch(e.target.value)}
      />
      <img src={searchIcon} className="w-6 h-auto " />
    </div>
  );
}

export default SearchBar;
