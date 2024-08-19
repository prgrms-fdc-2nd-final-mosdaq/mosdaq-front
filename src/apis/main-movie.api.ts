import { IMovie, IPollingMovies } from '@/models/main-movie.model';
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
  const res = await axiosInstance.get<IPollingMovies>(
    '/main-movie/poll?poll=false',
  );

  return res.data;
};

export const fetchPostPollMovie = async (
  movieId: number,
  myPollResult: string,
) => {
  console.log('Sending request to server:', { movieId, myPollResult });
  const res = await axiosInstance.put(`/poll/${movieId}`, { myPollResult });
  console.log('Server response:', res.data);
  return res.data;
};
