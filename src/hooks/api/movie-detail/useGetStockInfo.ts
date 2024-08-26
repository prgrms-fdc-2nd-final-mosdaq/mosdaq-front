import { useQuery } from '@tanstack/react-query';
import { fetchGetStockInfo } from '../../../apis/movie-detail.api';
import { IStockMovieInfo } from '@/models/stock.model';

export const useGetStockInfo = (movieId: string) => {
  const { data, isLoading, refetch } = useQuery<IStockMovieInfo>({
    queryKey: ['movieDetail', 'stocks', movieId],
    queryFn: () => fetchGetStockInfo(movieId),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    stockMovieInfo: data,
    isLoading,
    refetch,
  };
};
