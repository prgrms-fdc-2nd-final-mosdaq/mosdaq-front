import { useQuery } from '@tanstack/react-query';
import { fetchGetMainPollingMovie } from '../../../apis/main-movie.api';

export const useGetPollingMovie = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pollingMovies'],
    queryFn: fetchGetMainPollingMovie,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
  // console.log(data);

  return {
    pollingMovies: data,
    isLoading,
    refetch,
  };
};
