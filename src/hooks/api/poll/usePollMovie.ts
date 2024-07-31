import { useMutation } from '@tanstack/react-query';
import { fetchPollMovie } from '../../../apis/poll.api';

export const usePollMovie = (movieId: string) => {
  const { mutate } = useMutation({
    mutationFn: async () => fetchPollMovie(movieId),
    onSuccess: () => {},
  });

  const pollMovie = () => {
    mutate();
  };

  return {
    pollMovie,
  };
};
