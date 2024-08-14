import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGetMainBannerMovie } from '../../../apis/main-movie.api';
import { BannerMovie } from '@/models/movie.model';

export interface BannerResponse {
  movieList: BannerMovie[];
  movieListCount: number;
}

export const useGetBannerMovie = () => {
  const { data, isLoading, refetch, isError, isPending } =
    useQuery<BannerResponse>({
      queryKey: ['bannerMovie'],
      queryFn: fetchGetMainBannerMovie,
      staleTime: 0,
      refetchOnWindowFocus: true,
    });

  const [centerIndex, setCenterIndex] = useState(0);

  const handleLeftClick = useCallback(() => {
    if (centerIndex >= 4) setCenterIndex(0);
    else setCenterIndex(centerIndex + 1);
  }, [centerIndex]);

  const handleRightClick = useCallback(() => {
    if (data?.movieListCount) {
      if (centerIndex <= 0) setCenterIndex(data?.movieListCount - 1);
      else setCenterIndex(centerIndex - 1);
    }
  }, [centerIndex, data?.movieListCount]);

  const handleClick = useCallback((index: number) => {
    setCenterIndex(index);
  }, []);

  return {
    data,
    isLoading,
    isPending,
    centerIndex,
    handleClick,
    handleLeftClick,
    handleRightClick,
  };
};
