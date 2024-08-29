import { IPollBox } from '@/models/poll.model';
import axiosInstance from './axiosInstance';

export const fetchGetPollBox = async (movieId: string) => {
  const res = await axiosInstance.get(`/poll/${movieId}`);

  return res.data;
};

export const fetchPollMovie = async (
  movieId: number,
  pollResult: 'up' | 'down',
) => {
  const res = await axiosInstance.put(`/poll/${movieId}`, {
    pollResult,
  });

  return res.data;
};
