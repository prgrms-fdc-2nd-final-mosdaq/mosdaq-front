import { useQuery } from '@tanstack/react-query';
import { fetchGetPollBox } from '@/apis/poll.api';
import { IPollBox } from '@/models/poll.model';

export const useGetPollBox = (movieId: string) => {
  const { data, isLoading, refetch } = useQuery<IPollBox>({
    queryKey: ['movieDetail', 'pollBox', movieId],
    queryFn: () => fetchGetPollBox(movieId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    pollBox: data,
    isLoading,
    refetch,
  };
};
