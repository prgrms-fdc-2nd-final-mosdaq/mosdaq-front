import { IQuizResponse } from '@/models/quiz.model';
import axiosInstance from './axiosInstance';

export const fetchGetMovieQuiz = async () => {
  const res = await axiosInstance.get<IQuizResponse>('movie/quiz?count=10');

  return res.data;
};
