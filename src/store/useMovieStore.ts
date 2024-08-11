import { create } from 'zustand';
import { Movie } from '@/models/movie.model';
import { fetchGetMainPollingMovie } from '@/apis/main-movie.api';

interface MovieState {
  movieList: Movie[];
  isLoading: boolean;
  fetchMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  movieList: [],
  isLoading: true,
  fetchMovies: async () => {
    set({ isLoading: true });
    const data = await fetchGetMainPollingMovie();
    set({ movieList: data.movieList, isLoading: false });
  },
}));
