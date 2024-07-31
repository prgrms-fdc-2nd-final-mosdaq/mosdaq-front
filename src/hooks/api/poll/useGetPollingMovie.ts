import { useQuery } from '@tanstack/react-query';
import { fetchGetPollingMovie } from '../../../apis/poll.api';

export const useGetPollingMovie = (movieId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pollingMovie', movieId],
    queryFn: async () => fetchGetPollingMovie(movieId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    pollingMovie: data,
    isLoading,
    refetch,
  };
};
