export interface Movie {
  id: number;
  adult: boolean;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  title: string;
  overview: string;
}