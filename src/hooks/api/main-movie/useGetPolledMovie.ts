import { useQuery } from '@tanstack/react-query';
import { fetchGetMainPolledMovie } from '../../../apis/main-movie.api';

export const useGetPolledMovie = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['polledMovie'],
    queryFn: fetchGetMainPolledMovie,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    polledMovie: data,
    isLoading,
    refetch,
  };
};
