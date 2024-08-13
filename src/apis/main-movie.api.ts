import { IPollingMovies } from '@/models/main-movie.model';
import axiosInstance from './axiosInstance';
import { BannerResponse } from '@/hooks/api/main-movie/useGetBannerMovie';

export const fetchGetMainBannerMovie = async () => {
  const res = await axiosInstance.get<BannerResponse>('/main-movie');

  return res.data;
};

export const fetchGetMainPollingMovie = async () => {
  const res = await axiosInstance.get<IPollingMovies>(
    '/main-movie/poll?poll=true',
  );

  return res.data;
};

export const fetchGetMainPolledMovie = async () => {
  const res = await axiosInstance.get('/main-movie?poll=false');

  return res.data;
};
