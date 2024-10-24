import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGetMovieList } from '../../../apis/movie-list.api';
import { useLocation } from 'react-router-dom';

const limit = 10;

export const useGetMovieListInfinite = () => {
  const location = useLocation();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['movieList', location.search],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getMovieList({ pageParam, locationSearch: location.search }),
    getNextPageParam: (movieListRes) => {
      const isLastPage =
        movieListRes.pagination.totalPages ===
          movieListRes.pagination.currentPage ||
        movieListRes.pagination.totalPages === 0;

      return isLastPage ? null : movieListRes.pagination.currentPage;
    },
  });

  const movieListData = data?.pages.flatMap((page) => page.movieList) || [];
  const pagination = data?.pages[data.pages.length - 1].pagination || {};

  return {
    movieListData,
    pagination,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
};

const getMovieList = ({
  pageParam,
  locationSearch,
}: {
  pageParam: number;
  locationSearch: string;
}) => {
  const params = new URLSearchParams(locationSearch);

  const sort = (params.get('sort') as 'ASC' | 'DESC') || 'DESC';
  const poll = (params.get('poll') as 'true' | 'false') || 'true';
  const offset = pageParam * limit || 0;

  return fetchGetMovieList({ offset, limit, sort, poll });
};
