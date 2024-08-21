export interface IQuizInfo {
  movieTitle: string;
  moviePoster: string;
  fourWeeksBeforePrice: number;
  fourWeeksAfterPrice: number;
  currency: string;
}

export type IQuizResponse = IQuizInfo[];
