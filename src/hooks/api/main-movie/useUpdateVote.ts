import { fetchPostPollMovie } from '@/apis/main-movie.api';
import { useMutation } from '@tanstack/react-query';
import { IMovie } from '@/models/main-movie.model';
import useVoteStore from '@/store/voteStore';

export const useUpdateVote = () => {
  const { updateMovieVote, setMovies } = useVoteStore();

  const mutation = useMutation<
    IMovie,
    Error,
    { movieId: number; updatedMovie: IMovie }
  >({
    mutationFn: async ({ movieId, updatedMovie }) => {
      return fetchPostPollMovie(movieId, updatedMovie);
    },
    onSuccess: (updatedMovie) => {
      // 서버 응답을 상태에 반영
      updateMovieVote(updatedMovie.movieId, updatedMovie.myPollResult);
      console.log('Vote successful, updated movie:', updatedMovie);
    },
    onError: (error) => {
      console.error('Vote failed:', error);
      // 투표 실패 시 처리할 로직을 여기에 추가
    },
  });

  const updateVote = (movieId: number, voteType: 'up' | 'down') => {
    const currentMovies = useVoteStore.getState().movies;
    const movie = currentMovies.find((m) => m.movieId === movieId);

    if (!movie) return;

    const updatedMovie: IMovie = {
      ...movie,
      up: voteType === 'up' ? movie.up + 1 : movie.up,
      down: voteType === 'down' ? movie.down + 1 : movie.down,
      pollCount: movie.pollCount + 1,
      myPollResult: voteType,
    };

    mutation.mutate({ movieId, updatedMovie });
  };

  return { updateVote };
};
