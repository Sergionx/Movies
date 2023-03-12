import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getMoviePoster } from "../../firebase/api";
import { Movie } from "../../interfaces/Movie";

function Detail() {
  let { id } = useParams();
  let [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      setMovie(await getMovieById(id!));
      console.log(movie);
    };

    fetchData();
  }, []);
  //let { title, vote_average, vote_count, original_language, genre_ids, adult} = fetchedData;

  if (!movie) {
    return <div> Loading... </div>;
  } else {
    return (
      <div className="relative  flex flex-row gap-2">
        <div className="basis-1/3">
          <img
            src={getMoviePoster(movie!.poster_path)}
            className="h-[20rem] w-[15rem] object-cover rounded-xl "
          />
        </div>
        <div className="card-body basis-2/3">
          <h5 className="card-title text-4xl font-bold"> {movie?.title} </h5>
          <h5>
            {movie?.release_date} {movie?.original_language} {movie?.status}
          </h5>
          <p className="card-text">
            {" "}
            <h3 className="font-bold text-xl "> Overview </h3>
            {movie?.overview}
            <div className=" flex flex-row gap-6">
              <div>
                <h1 className="text-lg font-semibold"> Presupuesto</h1>
                <h3 className="text-lg"> Budget {movie?.budget} </h3>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Companias</h1>
                {movie?.production_companies?.map((company) => (
                  //Create a chip for each company
                  <div className="flex flex-row gap-2 bg-slate-400 rounded-xl p-3">
                    <img
                      src={getMoviePoster(company.logo_path)}
                      className="h-[2rem] w-[2rem] object-cover rounded-xl"
                    />
                    <h3 className="text-lg"> {company.name} </h3>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold"> Géneros </h3>
                {movie?.genres?.map((name) => (
                  <div className="flex flex-row gap-2 ">
                    <h3 className="text-lg"> {name.name} </h3>
                  </div>
                ))}
              </div>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

export default Detail;
