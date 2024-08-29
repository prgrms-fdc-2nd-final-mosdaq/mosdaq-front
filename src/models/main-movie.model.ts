export interface IMovie {
  movieId: number;
  movieTitle: string;
  posterUrl: string[];
  up: number;
  down: number;
  myPollResult: 'up' | 'down' | null;
}

export interface IPollingMovies {
  movieList: IMovie[];
  movieListCount: number;
}
