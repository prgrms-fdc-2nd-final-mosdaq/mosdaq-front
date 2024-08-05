import axiosInstance from './axiosInstance';

export const fetchPostGoogleOAuthLogin = async (token: string) => {
  const res = await axiosInstance.post(
    '/auth/google',
    { token: token },
    { withCredentials: true },
  );

  return res.data;
};

export const fetchGetUserInfo = async () => {
  const res = await axiosInstance.get('/users');

  return res.data;
};
