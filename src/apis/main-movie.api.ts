import axiosInstance from './axiosInstance';

export const fetchGetMainBannerMovie = async () => {
  const res = await axiosInstance.get('/main-movie');

  return res.data;
};

export const fetchGetMainPollingMovie = async () => {
  const res = await axiosInstance.get('/main-movie?poll=true');

  return res.data;
};

export const fetchGetMainPolledMovie = async () => {
  const res = await axiosInstance.get('/main-movie?poll=false');

  return res.data;
};
