import { useQuery } from '@tanstack/react-query';
import { fetchGetPolledMovieList } from '../../../apis/movie-list.api';

export const useGetPolledMovieList = ({
  offset,
  limit,
  sort,
}: {
  offset: number;
  limit: number;
  sort: string;
}) => {
  const {
    data: polledMovieList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['polledMovieList', offset, limit, sort],
    queryFn: () => fetchGetPolledMovieList({ offset, limit, sort }),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    movieList: polledMovieList,
    isLoading,
    error,
  };
};
