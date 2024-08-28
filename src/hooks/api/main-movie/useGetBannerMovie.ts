import { useCallback, useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetMainBannerMovie } from '../../../apis/main-movie.api';
import { BannerMovie } from '@/models/movie.model';

export interface BannerResponse {
  movieList: BannerMovie[];
  movieListCount: number;
}

export const useGetBannerMovie = () => {
  const { data } = useSuspenseQuery<BannerResponse>({
    queryKey: ['bannerMovie'],
    queryFn: fetchGetMainBannerMovie,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    data,
  };
};
