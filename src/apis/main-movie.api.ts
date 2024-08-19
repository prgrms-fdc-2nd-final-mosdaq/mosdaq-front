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

export const fetchPostPollMovie = async (movieId: number, movie: IMovie) => {
  const res = await axiosInstance.put(`/poll/${movieId}`, movie);
  console.log('Server response:', res.data); // 서버 응답 데이터 확인

  return res.data;
};
