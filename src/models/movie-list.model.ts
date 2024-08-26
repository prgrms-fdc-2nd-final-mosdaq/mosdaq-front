import { IMovie } from './main-movie.model';

export interface IMovieListResponse {
  movieList: IMovie[];
  movieListCount: number;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}
