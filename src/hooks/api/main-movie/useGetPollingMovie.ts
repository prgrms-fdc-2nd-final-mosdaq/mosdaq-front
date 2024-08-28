import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetMainPollingMovie } from '../../../apis/main-movie.api';

export const useGetPollingMovie = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['pollingMovies'],
    queryFn: fetchGetMainPollingMovie,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    pollingMovies: data,
  };
};
