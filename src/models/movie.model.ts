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
  stockPriceList: StockPriceList[];
}

export interface IPolledMovie extends Movie {
  up: number;
  down: number;
  myPollResult: 'up' | 'down';
  countryCode: string;
  companyName: string;
  beforePrice: number;
  afterPrice: number;
  beforePriceDate: string;
  afterPriceDate: string;
}
