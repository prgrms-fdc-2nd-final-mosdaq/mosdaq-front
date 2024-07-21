import axios from 'axios';
import { getItem } from '../utils/localStorage';
import { BASE_URL } from '../constants/url';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItem('token');

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

export default axiosInstance;
