export interface Movie {
  movieId: number;
  movieTitle: string;
  posterUrl: string[];
}

export interface BannerMovie extends Movie {
  countryCode: string;
  companyName: string;
  beforePrice: number;
  afterPrice: number;
  beforePriceDate: string;
  afterPriceDate: string;
}

export interface MovieDetail extends Movie {}
