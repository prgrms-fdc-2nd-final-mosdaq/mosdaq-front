export interface Movie {
  movieId: number;
  movieTitle: string;
  posterUrl: string[];
}

export interface StockPriceList {
  price: number;
  date: string;
}

export interface BannerMovie extends Movie {
  countryCode: string;
  companyName: string;
  movieOpenDate: Date;
  stockPriceList: StockPriceList[];
}

export interface IMovieDetail extends Movie {
  movieDirector: string;
  movieOpenDate: string;
  movieDescription: string;
  moviePoster: string[];
}
