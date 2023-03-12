import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import { getMovies } from "../../firebase/api";
import { Movie } from "../../interfaces/Movie";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function initializeMovies() {
      setMovies(await getMovies());
    }

    initializeMovies();
    console.log("Home");
  }, []);

  return (
    <div>
      dsd
      <div className="flex flex-wrap gap-3">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
