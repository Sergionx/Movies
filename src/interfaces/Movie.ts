import { Company } from "./Companies";
import { Genre } from "./Genre";

export interface Movie {
  id: number;
  adult: boolean;
  genres: Genre[];
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  title: string;
  original_language: string;
  overview: string;
  release_date: string;
  status: string;
  budget: number;
  production_companies: Company[];
}