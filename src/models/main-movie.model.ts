export interface IMovie {
  movieId: number;
  movieTitle: string;
  posterUrl: string;
  up: number;
  down: number;
  pollCount: number;
  myPollResult: 'up' | 'down' | null;
}

export interface IPollingMovies {
  movieList: IMovie[];
  movieListCount: number;
}
