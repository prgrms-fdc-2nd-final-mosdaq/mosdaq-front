import { useQuery } from '@tanstack/react-query';
import { fetchGetMovieDetail } from '../../../apis/movie-detail.api';

export const useGetMovieDetail = (movieId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['movieDetail', movieId],
    queryFn: async () => fetchGetMovieDetail(movieId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    movieDetail: data,
    isLoading,
    refetch,
  };
};
