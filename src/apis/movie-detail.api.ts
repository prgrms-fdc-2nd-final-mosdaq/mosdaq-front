import axiosInstance from './axiosInstance';
import { IStockMovieInfo } from '@/models/stock.model';
import { IMovieDetail } from '@/models/movie.model';

export const fetchGetMovieDetail = async (movieId: string) => {
  const res = await axiosInstance.get<IMovieDetail>(`/movie/detail/${movieId}`);

  return res.data;
};

export const fetchGetStockInfo = async (movieId: string) => {
  const res = await axiosInstance.get<IStockMovieInfo>(
    `/stocks/movies/${movieId}`,
  );

  return res.data;
};
