import React, { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import Loading from "../../components/Loading";
import MovieCard from "../../components/MovieCard";
import { getMovies, getMovieUpcoming } from "../../firebase/api";
import { Movie } from "../../interfaces/Movie";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [textButton, setTextButton] = useState("Ver próximas a estrenar");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function initializeMovies() {
      setLoading(true);
      setMovies(await getMovies(currentPage));
      setCurrentPage(currentPage + 1);
      setLoading(false);
    }

    initializeMovies();
  }, []);

  useBottomScrollListener(addMovies);

  async function addMovies() {
    if (loading) {
      console.log("loading");
      return;
    }
    if (currentPage == 1) {
      setCurrentPage(2)
    }

    setLoading(true);
    setCurrentPage(currentPage + 1);

    if (textButton === "Ver próximas a estrenar") {
      setTimeout(async () => {
        const newMovies = await getMovies(currentPage);
        setMovies([...movies, ...newMovies]);
      }, 10)
      setLoading(false);
    } else if (textButton === "Ver comunes") {
      setTimeout(async () => {
        const newMovies = await getMovieUpcoming(currentPage);
        setMovies([...movies, ...newMovies]);
      }, 10)
      setLoading(false);
    }
    console.log(currentPage);
  }

  async function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    setLoading(true);
    setCurrentPage(1);
    console.log(currentPage);
    setMovies([]);

    if (textButton === "Ver próximas a estrenar") {
      setMovies(await getMovieUpcoming(1));
      setTextButton("Ver comunes");
    } else if (textButton === "Ver comunes") {
      setMovies(await getMovies(1));
      setTextButton("Ver próximas a estrenar");
    }
    setLoading(false);
  }

  return (
    <div className="bg-terciary2 p-8">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold ">Movies</h1>

        <button
          onClick={handleClick}
          className="bg-primary text-white px-4 py-2 rounded-lg ml-12"
        >
          {textButton}
        </button>
      </span>

      <div
        className={`flex flex-wrap gap-5 mt-4 justify-center relative
        ${loading && "h-[60rem]"}
        border-[5px] rounded-xl border-secondary p-2 bg-terciary3`}
      >
        {/* TODO - mejorar que se vea loading */}
        {loading && (
          <Loading
            svgClass="h-[20rem] w-[20rem]"
            statusClass={`absolute -translate-x-1/2 -translate-y-1/2 ${
              movies.length >= 15 ? "top-2/4" : "top-[90%]"
            } left-1/2 z-50`}
          />
        )}

        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      {/* <div className="bg-gray-400 mt-[7rem] relative h-48 w-full p-[15rem]">
        <Loading
          svgClass="h-[20rem] w-[20rem]"
          statusClass="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        />
      </div> */}
    </div>
  );
}

export default Home;
