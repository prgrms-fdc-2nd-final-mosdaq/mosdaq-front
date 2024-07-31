import { useQuery } from '@tanstack/react-query';
import { fetchGetPollingMovieList } from '../../../apis/movie-list.api';

export const useGetPollingMovieList = ({
  offset,
  limit,
  sort,
}: {
  offset: number;
  limit: number;
  sort: string;
}) => {
  const {
    data: pollingMovieList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['pollingMovieList', offset, limit, sort],
    queryFn: () => fetchGetPollingMovieList({ offset, limit, sort }),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    movieList: pollingMovieList,
    isLoading,
    error,
  };
};
