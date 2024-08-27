import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetStockInfo } from '../../../apis/movie-detail.api';
import { IStockMovieInfo } from '@/models/stock.model';
import { getTodayYYYYMMDD } from '@/utils/format';

export const useGetStockInfo = (movieId: string) => {
  const { data } = useSuspenseQuery<IStockMovieInfo>({
    queryKey: ['movieDetail', 'stocks', movieId],
    queryFn: () => fetchGetStockInfo(movieId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    stockMovieInfo: data,
  };
};
