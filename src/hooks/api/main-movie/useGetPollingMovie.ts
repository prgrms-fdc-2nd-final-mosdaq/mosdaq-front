import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetMainPollingMovie } from '../../../apis/main-movie.api';

export const useGetPollingMovie = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['pollingMovies'],
    queryFn: fetchGetMainPollingMovie,
    staleTime: 1000 * 6 * 10,
    gcTime: 1000 * 6 * 10,
  });

  return {
    pollingMovies: data,
  };
};
