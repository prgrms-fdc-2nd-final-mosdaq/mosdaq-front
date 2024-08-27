import { IMovieListResponse } from '@/models/movie-list.model';
import axiosInstance from './axiosInstance';

export const fetchGetUserPollInfo = async ({
  offset,
  limit,
  sort = 'DESC',
  poll,
  year,
}: {
  offset: number;
  limit: number;
  sort?: 'ASC' | 'DESC';
  poll: 'true' | 'false';
  year?: number;
}) => {
  const res = await axiosInstance.get<IMovieListResponse>(
    `/users/poll?poll=${poll}&offset=${offset}&limit=${limit}&sort=${sort}${year ? `&year=${year}` : ''}`,
  );

  return res.data;
};
