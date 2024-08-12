import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGetMainBannerMovie } from '../../../apis/main-movie.api';
import { BannerMovie } from '@/models/movie.model';
import { useQueryClient } from '@tanstack/react-query';

export interface BannerResponse {
  movieList: BannerMovie[];
  movieListCount: number;
}

export const useGetBannerMovie = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch, isError, isPending } =
    useQuery<BannerResponse>({
      queryKey: ['bannerMovie'],
      queryFn: fetchGetMainBannerMovie,
      staleTime: 0,
      refetchOnWindowFocus: true,
    });

  return { data, isLoading, isPending };
};
