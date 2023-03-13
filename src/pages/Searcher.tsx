import React, { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { getMovies, getMovieUpcoming, getSearchMovie } from "../firebase/api";
import { Movie } from "../interfaces/Movie";

function Searcher() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieUpcoming(1).then((movies) => {
      setMovies(movies);
      setLoading(false);
    });
  }, []);

  useBottomScrollListener(addMovies);

  async function addMovies() {
    if (loading) return;

    setLoading(true);
    const newMovies = await getSearchMovie(inputValue, currentPage + 1);
    if (newMovies.length === 0) {
      setLoading(false);
      return;
    }
    setMovies([...movies, ...newMovies]);
    setCurrentPage(currentPage + 1);
    setLoading(false);
  }

  function handleSearch(value: string) {
    setInputValue(value);
    setCurrentPage(1);

    if (value.length > 2) {
      setSearched(true);
      setLoading(true);
      getSearchMovie(value, currentPage).then((movies) => {
        setMovies(movies);
        setLoading(false);
      });
    }
  }

  if (!searched) {
    return (
      <div className="flex flex-col justify-center self-center bg-terciary1 p-4">
        <div className="w-[40%] self-center">
          <SearchBar handleSearch={handleSearch} searchValue={inputValue} />
        </div>

        <div
          className={`mt-4 ${loading && movies.length !== 0 && "min-h-[60rem]"}
      border-[5px] rounded-xl border-secondary p-2 bg-terciary3 `}
        >
          <h1 className="text-3xl font-bold text-center text-primary">
            Próximos estrenos
          </h1>

          {loading && (
            <Loading
              svgClass="h-[20rem] w-[20rem]"
              statusClass={`absolute -translate-x-1/2 -translate-y-1/2 ${
                movies.length >= 15 ? "top-2/4" : "top-[90%]"
              } left-1/2 z-50`}
            />
          )}

          <div className="flex flex-wrap gap-5 mt-4 justify-center">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center self-center bg-terciary1 p-4">
      <div className="w-[40%] self-center">
        <SearchBar handleSearch={handleSearch} searchValue={inputValue} />
      </div>

      <div
        className={`mt-4 ${loading && movies.length !== 0 && "min-h-[60rem]"}
        border-[5px] rounded-xl border-secondary p-2 bg-terciary3 `}
      >
        {movies.length === 0 ? (
          <h1 className="text-3xl font-bold text-center text-primary">
            No hay resultados
          </h1>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-primary">
              {inputValue}
            </h1>

            {loading && (
              <Loading
                svgClass="h-[20rem] w-[20rem]"
                statusClass={`absolute -translate-x-1/2 -translate-y-1/2 ${
                  movies.length >= 15 ? "top-2/4" : "top-[90%]"
                } left-1/2 z-50`}
              />
            )}

            <div className="flex flex-wrap gap-5 mt-4 justify-center">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Searcher;
