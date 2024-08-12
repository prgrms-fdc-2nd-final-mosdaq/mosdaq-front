export interface IMovie {
  movieId: number;
  movieTitle: string;
  posterUrl: string;
  up: number;
  down: number;
  pollCount: number;
  myPollResult: string;
}

export interface IPollingMovies {
  movieList: IMovie[];
  movieListCount: number;
}
