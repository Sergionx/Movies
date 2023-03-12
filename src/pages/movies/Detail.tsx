import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getMoviePoster } from "../../firebase/api";
import { Movie } from "../../interfaces/Movie";

function Detail() {
  let { id } = useParams();
  let [movie, setMovie] = useState<Movie | null>(null);

  const imgStyle = {
    backgroundImage: `url(${getMoviePoster(movie!.backdrop_path)})`,
    backgroundSize: "cover",
    backgroundPosition: "left calc((50vw - 170px) - 340px) top",
    backgroundRepeat: "no-repeat",
  } as React.CSSProperties;

  const colorStyle = {
    backgroundImage:
      "linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)",
  } as React.CSSProperties;

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

  function toCurrency(number: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  }
  if (!movie) {
    return <div> Loading... </div>;
  } else {
    return (
      <>
        <div style={imgStyle}>
          <div style={colorStyle}>
            <div className="flex flex-row gap-2 py-4 px-12 text-white">
              <div className="basis-1/3">
                <img
                  src={getMoviePoster(movie!.poster_path)}
                  className="h-[20rem] w-[15rem] object-cover rounded-xl "
                />
              </div>

              <div className="card-body basis-2/3">
                <h5 className="card-title text-4xl font-bold">
                  {movie?.title}{" "}
                </h5>
                <h5>
                  {movie?.release_date} {movie?.original_language}{" "}
                </h5>
                <section className="flex flex-row gap-2 my-3">
                  {movie?.genres?.map((genre) => (
                    <h5 className="text-lg font-semibold bg-terciary3 rounded-lg px-2">
                      {" "}
                      {genre.name}{" "}
                    </h5>
                  ))}
                </section>
                <p className="card-text">
                  {" "}
                  <h3 className="font-bold text-xl "> Overview </h3>
                  {movie?.overview}
                  <div className=" flex flex-row justify-between">
                    <div>
                      <h1 className="text-lg font-semibold"> Presupuesto</h1>
                      <h3 className="text-lg">
                        {" "}
                        Budget {toCurrency(movie?.budget)}{" "}
                      </h3>
                    </div>

                    <div>
                      <h1 className="text-lg font-semibold">Companias</h1>
                      <div className="flex flex-col">
                        {movie?.production_companies?.map((company) => (
                          //Create a chip for each company
                          <img
                            src={getMoviePoster(company.logo_path)}
                            className="h-auto w-[7rem] object-cover rounded-xl"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Detail;
