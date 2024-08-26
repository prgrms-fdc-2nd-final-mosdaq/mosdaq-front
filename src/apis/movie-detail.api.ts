import axiosInstance from './axiosInstance';
import { IMovieDetail } from '@/models/movie.model';
export const fetchGetMovieDetail = async (movieId: string) => {
  const res = await axiosInstance.get<IMovieDetail>(`/movie/detail/${movieId}`);

  return res.data;
};
