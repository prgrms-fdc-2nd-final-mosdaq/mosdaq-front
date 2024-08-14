import { IPollingMovies } from '@/models/main-movie.model';
import axiosInstance from './axiosInstance';

export const fetchGetMainPollingMovie = async () => {
  const res = await axiosInstance.get<IPollingMovies>(
    '/main-movie/poll?poll=true',
  );

  return res.data;
};

export const fetchGetMainPolledMovie = async () => {
  const res = await axiosInstance.get<IPollingMovies>(
    '/main-movie/poll?poll=false',
  );

  return res.data;
};
