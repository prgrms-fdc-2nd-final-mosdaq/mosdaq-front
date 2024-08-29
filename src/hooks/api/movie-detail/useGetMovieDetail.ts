import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetMovieDetail } from '../../../apis/movie-detail.api';
import { IMovieDetail } from '@/models/movie.model';

export const useGetMovieDetail = (movieId: string) => {
  const { data } = useSuspenseQuery<IMovieDetail>({
    queryKey: ['movieDetail', movieId],
    queryFn: () => fetchGetMovieDetail(movieId),
    staleTime: 1000 * 6 * 120,
    gcTime: 1000 * 6 * 120,
  });

  return {
    movieDetail: data,
  };
};
