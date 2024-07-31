import axiosInstance from './axiosInstance';

export const fetchGetMovieDetail = async (movieId: string) => {
  const res = await axiosInstance.get(`/movie/${movieId}`);

  return res.data;
};
