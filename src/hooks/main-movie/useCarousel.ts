import { useState, useEffect } from 'react';
import { IMovie } from '@/models/main-movie.model';
import { useQueryClient } from '@tanstack/react-query';

export function useCarousel(movieList: IMovie[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [updatedMovie, setUpdatedMovie] = useState<IMovie>(movieList[0]);
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const currentMovie = movieList[currentIndex];

    // 캐시에서 현재 영화의 업데이트된 상태를 가져옴
    const cachedMovies = queryClient.getQueryData<{ movieList: IMovie[] }>([
      'pollingMovies',
    ]);

    const foundMovie =
      cachedMovies?.movieList.find(
        (movie) => movie.movieId === currentMovie.movieId,
      ) || currentMovie;

    setUpdatedMovie(foundMovie);
  }, [currentIndex, movieList, queryClient]);

  return { updatedMovie, nextSlide, prevSlide };
}
