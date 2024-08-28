import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPollMovie } from '../../../apis/poll.api';
import { IPollBox } from '@/models/poll.model';

export const usePollMovie = (movieId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (pollResult: 'up' | 'down') =>
      fetchPollMovie(movieId, pollResult),
    onSuccess: (data: IPollBox, variables) => {
      console.log('Vote successful, server response:', data);

      // 캐시된 데이터를 가져옴
      const cachedPollBox = queryClient.getQueryData<IPollBox>([
        'pollBox',
        movieId,
      ]);

      if (cachedPollBox) {
        // 새로운 데이터를 기반으로 캐시 업데이트
        const updatedPollBox: IPollBox = {
          ...cachedPollBox,
          up: variables === 'up' ? cachedPollBox.up + 1 : cachedPollBox.up,
          down:
            variables === 'down' ? cachedPollBox.down + 1 : cachedPollBox.down,
          total: cachedPollBox.total + 1,
          pollResult: data.pollResult,
        };

        // 캐시 업데이트
        queryClient.setQueryData(['pollBox', movieId], updatedPollBox);
      } else {
        console.error('Poll data not found in cache');
      }
    },
    onError: (error) => {
      console.error('Error submitting vote:', error);
    },
  });

  const pollMovie = (pollResult: 'up' | 'down') => {
    mutate(pollResult);
  };

  return {
    pollMovie,
  };
};
