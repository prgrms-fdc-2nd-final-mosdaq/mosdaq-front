import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetMovieDetail } from '../../../apis/movie-detail.api';
import { IMovieDetail } from '@/models/movie.model';

export const useGetMovieDetail = (movieId: string) => {
  const { data, isLoading, refetch } = useSuspenseQuery<IMovieDetail>({
    queryKey: ['movieDetail', movieId],
    queryFn: () => fetchGetMovieDetail(movieId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    movieDetail: data,
    isLoading,
    refetch,
  };
};
