import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetMovieDetail } from '../../../apis/movie-detail.api';
import { IMovieDetail } from '@/models/movie.model';

export const useGetMovieDetail = (movieId: string) => {
  const { data } = useSuspenseQuery<IMovieDetail>({
    queryKey: ['movieDetail', movieId],
    queryFn: () => fetchGetMovieDetail(movieId),
  });
  // export const useGetMovieDetail = (movieId: string | undefined) => {
  //   const { data, isLoading, refetch } = useQuery({
  //     queryKey: ['movieDetail', movieId],
  //     queryFn: async () => {
  //       if (movieId) {
  //         return await fetchGetMovieDetail(movieId);
  //       }
  //       return null; // movieId가 없는 경우 null 반환
  //     },
  //     staleTime: 0,
  //     refetchOnWindowFocus: true,
  //   });

  return {
    movieDetail: data,
  };
};
