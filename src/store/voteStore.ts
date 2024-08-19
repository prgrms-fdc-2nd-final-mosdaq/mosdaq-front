import { IMovie } from './../models/main-movie.model';
import { create } from 'zustand';

type State = {
  movies: IMovie[];
  isVoted: 'up' | 'down' | null;
};

type Action = {
  setMovies: (movies: IMovie[]) => void;
  setIsVoted: (isVoted: 'up' | 'down' | null) => void;
  updateMovieVote: (movieId: number, voteType: 'up' | 'down') => void;
};

const useVoteStore = create<State & Action>((set, get) => ({
  movies: [],
  isVoted: null,
  setIsVoted: (isVoted) => set(() => ({ isVoted: isVoted })),
  setMovies: (movies) => set(() => ({ movies })),
  updateMovieVote: (movieId, voteType) => {
    const movies = get().movies;
    const movie = movies.find((m) => m.movieId === movieId);

    if (movie) {
      const updatedUp = voteType === 'up' ? movie.up + 1 : movie.up;
      const updatedDown = voteType === 'down' ? movie.down + 1 : movie.down;

      const updatedMovie: IMovie = {
        ...movie,
        up: updatedUp,
        down: updatedDown,
        pollCount: movie.pollCount + 1,
        myPollResult: voteType,
      };

      // 상태 업데이트
      set((state) => ({
        movies: state.movies.map((m) =>
          m.movieId === movieId ? updatedMovie : m,
        ),
      }));
    }
  },
}));

export default useVoteStore;
