export interface Movie {
  movieId: number;
  movieTitle: string;
  posterUrl: string;
  up: number;
  down: number;
  pollCount: number;
  myPollResult: string;
}

export interface MovieDetail extends Movie {}
