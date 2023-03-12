import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { getMovies, getSearchMovie } from "../firebase/api";
import { Movie } from "../interfaces/Movie";

function Searcher() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [inputValue, setInputValue] = useState("");

  function handleSearch(value: string) {
    setInputValue(value);

    if (value.length > 2) {
      getSearchMovie(value).then((movies) => setMovies(movies));
    }
  }

  return (
    <div className="flex flex-col justify-center self-center bg-terciary1 p-4">
      <div className="w-[40%] self-center">
        <SearchBar handleSearch={handleSearch} searchValue={inputValue} />
      </div>

      <div
        className="mt-4 
        border-[5px] rounded-xl border-secondary p-2 bg-terciary3 "
      >
        <h1 className="text-3xl font-bold text-center text-primary">{inputValue}</h1>

        <div
          className="flex flex-wrap gap-5 mt-4 justify-center"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Searcher;
