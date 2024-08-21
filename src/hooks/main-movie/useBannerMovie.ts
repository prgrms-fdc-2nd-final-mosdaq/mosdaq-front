import { useCallback, useState } from 'react';
import { BannerMovie } from '@/models/movie.model';

export interface BannerResponse {
  movieList: BannerMovie[];
  movieListCount: number;
}

export const useBannerMovie = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isCardFliped, setIsCardFliped] = useState(false);

  const handleClick = useCallback((index: number) => {
    setCenterIndex(index);
    setIsCardFliped((prev) => !prev);
  }, []);

  return {
    isCardFliped,
    setIsCardFliped,
    centerIndex,
    setCenterIndex,
    handleClick,
  };
};
