import { useState, useEffect } from 'react';
import { IMovie } from '@/models/main-movie.model';
import { useQueryClient } from '@tanstack/react-query';

export function useCarousel(movieList: IMovie[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMovies, setCurrentMovies] = useState<IMovie[]>([]);
  const queryClient = useQueryClient();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= movieList.length ? 0 : prevIndex + 3,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(movieList.length - 3, 0) : prevIndex - 3,
    );
  };

  useEffect(() => {
    const moviesToDisplay = movieList.slice(currentIndex, currentIndex + 3);
    const cachedMovies = queryClient.getQueryData<{ movieList: IMovie[] }>([
      'pollingMovies',
    ]);

    const updatedMovies = moviesToDisplay.map((currentMovie) => {
      const foundMovie =
        cachedMovies?.movieList.find(
          (movie: IMovie) => movie.movieId === currentMovie.movieId,
        ) || currentMovie;
      return foundMovie;
    });

    setCurrentMovies(updatedMovies);
  }, [currentIndex, movieList, queryClient]);

  return { currentMovies, nextSlide, prevSlide };
}
