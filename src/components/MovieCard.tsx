import React, { useState } from "react";
import { getMoviePoster } from "../firebase/api";
import Flag from "react-world-flags";

import { Movie } from "../interfaces/Movie";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: Movie;
}

function MovieCard(props: Props) {
  const color =
    props.movie.vote_average > 7
      ? "green"
      : props.movie.vote_average > 5
      ? "yellow"
      : "red";

  const [language, setLanguage] = useState<string>(
    props.movie.original_language == "en"
      ? "us"
      : props.movie.original_language == "ja" ? "jp" : "es"
  );

  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    navigate(`${props.movie.id}`);
  }

  return (
    <div className="relative cursor-pointer rounded-xl shadow-primary shadow-md" onClick={handleClick}>
      <div className="flex flex-col items-center">
        <img
          src={getMoviePoster(props.movie.poster_path)}
          className="h-[20rem] w-[15rem] object-cover rounded-xl"
        />

        <footer className="w-full absolute bottom-0 left-0 movie-footer-gradient px-4 pt-12 pb-4 rounded-xl">
          <h1 className="text-xl font-bold text-white text-center ">
            {props.movie.title}
          </h1>
        </footer>

        <header className="w-full absolute top-0 left-0 movie-footer-gradient px-4 flex justify-between">
          <div id="percentge" className="w-[33%]">
            <svg viewBox="0 0 36 36" className="block my-2 max-w-[70%]">
              <path
                className="fill-none stroke-[#eee]"
                strokeWidth={1.5}
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="fill-none"
                strokeWidth={2.8}
                stroke={color}
                strokeDasharray={`${props.movie.vote_average * 10}, 100`}
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text
                x="18"
                y="20.35"
                className="text-ellipsis  text-[0.5rem]"
                fill="white"
                textAnchor="middle"
              >
                {props.movie.vote_average * 10}%
              </text>
            </svg>
          </div>

          <Flag
            className="h-5 self-center"
            code={language}
            fallback={<h1>hola</h1>}
          />
          {/* <div
            x-data="scrollProgress"
            className="absolute inline-flex items-center justify-center overflow-hidden rounded-full top-5 left-5 h-5 w-5"
          >
            <svg className="w-20   h-20">
              <circle
                className="text-gray-300"
                stroke-width="5"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="40"
                cy="40"
              />
              <circle
                className={`${color}`}
                stroke-width="5"
                strokeDasharray={2 * Math.PI * 30}
                strokeDashoffset={
                  (1 - props.movie.vote_average / 10) * 2 * Math.PI * 30
                }
                stroke-linecap="round"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="40"
                cy="40"
              />
            </svg>
            <span className="absolute text-xl text-white font-bold">
              {props.movie.vote_average * 10}%
            </span>
          </div> */}
        </header>
      </div>
    </div>
  );
}

export default MovieCard;
