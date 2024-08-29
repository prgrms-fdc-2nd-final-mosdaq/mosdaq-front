import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetPollBox } from '@/apis/poll.api';
import { IPollBox } from '@/models/poll.model';

export const useGetPollBox = (movieId: string) => {
  const { data } = useSuspenseQuery<IPollBox>({
    queryKey: ['movieDetail', 'pollBox', movieId],
    queryFn: () => fetchGetPollBox(movieId),
    staleTime: 1000 * 6,
    gcTime: 1000 * 6,
  });

  return {
    pollBox: data,
  };
};
