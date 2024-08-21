export interface Movie {
  movieId: number;
  movieTitle: string;
  posterUrl: string[];
}

export interface BannerMovie extends Movie {
  countryCode: string;
  companyName: string;
  stockPriceList: { price: number; date: string }[];
}

export interface MovieDetail extends Movie {}
