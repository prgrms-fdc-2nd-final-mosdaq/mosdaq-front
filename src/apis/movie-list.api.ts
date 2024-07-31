import axiosInstance from './axiosInstance';

export const fetchGetPollingMovieList = async ({
  offset,
  limit,
  sort,
}: {
  offset: number;
  limit: number;
  sort: string;
}) => {
  const res = await axiosInstance.get(
    `/movie/poll/list?poll=true&offset=${offset}&limit=${limit}&sort=${sort}`,
  );

  return res.data;
};

export const fetchGetPolledMovieList = async ({
  offset,
  limit,
  sort,
}: {
  offset: number;
  limit: number;
  sort: string;
}) => {
  const res = await axiosInstance.get(
    `/movie/poll/list?poll=false&offset=${offset}&limit=${limit}&sort=${sort}`,
  );

  return res.data;
};
