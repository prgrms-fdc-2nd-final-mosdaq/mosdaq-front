import { IPollResponse } from '@/models/poll.model';
import axiosInstance from './axiosInstance';

export const fetchGetPollingMovie = async (movieId: string) => {
  const res = await axiosInstance.get(`/poll/${movieId}`);

  return res.data;
};

export const fetchPollMovie = async (movieId: string) => {
  const res = await axiosInstance.put<IPollResponse>(`/poll/${movieId}`);

  return res.data;
};
