import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { getMovies } from "../firebase/api";

function Searcher() {
  return (
    <div>
      <SearchBar placeholder="Ingre el nombre de la película" />
    </div>
  );
}

export default Searcher;
