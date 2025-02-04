import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetStockInfo } from '../../../apis/movie-detail.api';
import { IStockMovieInfo } from '@/models/stock.model';

export const useGetStockInfo = (movieId: string) => {
  const { data } = useSuspenseQuery<IStockMovieInfo>({
    queryKey: ['movieDetail', 'stocks', movieId],
    queryFn: () => fetchGetStockInfo(movieId),
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 5,
  });

  return {
    stockMovieInfo: data,
  };
};
