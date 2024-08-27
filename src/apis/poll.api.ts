import { IPollBox } from '@/models/poll.model';
import axiosInstance from './axiosInstance';

export const fetchGetPollBox = async (movieId: string) => {
  const res = await axiosInstance.get(`/poll/${movieId}`);

  return res.data;
};

export const fetchGetPollingMovie = async (movieId: string) => {
  const res = await axiosInstance.get(`/main-movie/poll/${movieId}`);

  return res.data;
};

export const fetchPollMovie = async (movieId: string) => {
  const res = await axiosInstance.put<IPollBox>(`/poll/${movieId}`);

  return res.data;
};
