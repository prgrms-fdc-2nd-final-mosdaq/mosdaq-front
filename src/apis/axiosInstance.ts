import axios from 'axios';
import { getItem, removeItem, setItem } from '../utils/localStorage';
import { BASE_URL } from '../constants/url';
import { redirect } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// 로컬스토리지 사용시 주석해제
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axiosInstance.post('/auth/refresh', {
            refreshToken: refreshToken,
          });

          // 새로운 액세스 토큰을 로컬 스토리지에 저장
          setItem('accessToken', response.data.accessToken);
          setItem('refreshToken', response.data.refreshToken);

          // 원래의 요청에 새로운 액세스 토큰을 추가하여 재전송
          error.config.headers['Authorization'] =
            'Bearer ' + response.data.accessToken;
          return axios.request(error.config);
        } catch (error) {
          console.error('Refresh token failed', error);
          //logout
          removeItem('accessToken');
          removeItem('refreshToken');
          redirect('/login');
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
