import { useState } from 'react';
import { IMovie } from '@/models/main-movie.model';

// TODO: 라이브러리 사용 고려
export function useCarousel(movieList: IMovie[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movieList.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movieList.length - 1 : prevIndex - 1,
    );
  };

  const currentMovies = movieList.slice(currentIndex, currentIndex + 3);

  return { currentMovies, nextSlide, prevSlide };
}
