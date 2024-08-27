import { StockPriceList } from './movie.model';

export interface IStockMovieInfo {
  beforePriceDate: string;
  beforePrice: number;
  afterPriceDate: string;
  afterPrice: number;
  stockIndustryAverageVariation: number;
  companyName: string;
  countryCode: string;
  stockPriceList: StockPriceList[];
}
