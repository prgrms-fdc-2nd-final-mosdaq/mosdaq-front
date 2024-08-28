import { IPolledMovie } from '@/models/movie.model';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchGetMainPolledMovie } from '../../../apis/main-movie.api';

export interface IPolledMovieResponse {
  movieList: IPolledMovie[];
  movieListCount: number;
}

export const useGetPolledMovie = () => {
  const { data } = useSuspenseQuery<IPolledMovieResponse>({
    queryKey: ['polledMovie'],
    queryFn: fetchGetMainPolledMovie,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    polledMovies: data,
  };
};
