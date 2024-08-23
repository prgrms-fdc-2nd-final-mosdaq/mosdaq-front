export interface IQuizInfo {
  movieTitle: string;
  moviePoster: string;
  fourWeeksBeforePrice: number;
  fourWeeksAfterPrice: number;
  companyCountry: string;
  companyName: string;
}

export type IQuizResponse = IQuizInfo[];
