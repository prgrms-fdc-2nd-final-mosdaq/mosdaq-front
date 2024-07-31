import axiosInstance from './axiosInstance';

export const fetchGetMovieQuiz = async () => {
  const res = await axiosInstance.get('/quiz');

  return res.data;
};
