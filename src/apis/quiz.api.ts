import axiosInstance from './axiosInstance';

export const fetchGetMovieQuiz = async () => {
  const res = await axiosInstance.get('movie/quiz');

  return res.data;
};
