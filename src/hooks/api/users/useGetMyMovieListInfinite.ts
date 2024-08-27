import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { fetchGetUserPollInfo } from '@/apis/users.api';

const limit = 6;

export const useGetMyMovieListInfinite = () => {
  const location = useLocation();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['myMovieList', location.search],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getMyMovieList({ pageParam, locationSearch: location.search }),
    getNextPageParam: (movieListRes) => {
      const isLastPage =
        movieListRes.pagination.totalPages ===
        movieListRes.pagination.currentPage;
      // console.log(movieListRes.pagination.currentPage);

      return isLastPage ? null : movieListRes.pagination.currentPage;
    },
  });

  const myMovieListData = data?.pages.flatMap((page) => page.movieList) || [];
  const pagination = data?.pages[data.pages.length - 1].pagination || {};

  return {
    myMovieListData,
    pagination,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
};

const getMyMovieList = ({
  pageParam,
  locationSearch,
}: {
  pageParam: number;
  locationSearch: string;
}) => {
  const params = new URLSearchParams(locationSearch);

  const sort = params.get('sort') as 'ASC' | 'DESC';
  const poll = params.get('poll') as 'true' | 'false';
  const offset = pageParam * limit || 0;

  return fetchGetUserPollInfo({ offset, limit, sort, poll });
};
