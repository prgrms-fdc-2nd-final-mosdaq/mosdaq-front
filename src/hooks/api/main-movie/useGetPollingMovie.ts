import { useQuery } from '@tanstack/react-query';
import { fetchGetMainPollingMovie } from '../../../apis/main-movie.api';

export const useGetPollingMovie = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pollingMovie'],
    queryFn: fetchGetMainPollingMovie,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    pollingMovie: data,
    isLoading,
    refetch,
  };
};
