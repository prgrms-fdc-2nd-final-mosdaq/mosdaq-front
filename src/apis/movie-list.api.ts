import { IMovieListResponse } from '@/models/movie-list.model';
import axiosInstance from './axiosInstance';

export const fetchGetMovieList = async ({
  offset,
  limit,
  sort,
  poll,
}: {
  offset: number;
  limit: number;
  sort: 'ASC' | 'DESC';
  poll: 'true' | 'false';
}) => {
  const res = await axiosInstance.get<IMovieListResponse>(
    `/movie/list?poll=${poll}&offset=${offset}&limit=${limit}&sort=${sort}`,
  );

  return res.data;
};
