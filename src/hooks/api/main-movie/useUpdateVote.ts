import { fetchPostPollMovie } from '@/apis/main-movie.api';
import { useMutation } from '@tanstack/react-query';
import useVoteStore from '@/store/voteStore';

export const useUpdateVote = (movieId: number) => {
  const { updateMovieVote, setMovies } = useVoteStore();
  const { mutate } = useMutation({
    mutationFn: async (myPollResult: 'up' | 'down') => {
      console.log(
        'Mutation function called with movieId:',
        movieId,
        'myPollResult:',
        myPollResult,
      );
      return fetchPostPollMovie(movieId, myPollResult);
    },
    onSuccess: (data, variables) => {
      console.log('Vote successful, server response:', data);
      updateMovieVote(movieId, variables); // 클라이언트 측에서 up/down 값을 업데이트
    },
    onError: (error) => {
      console.error('Vote failed:', error);
    },
  });

  const updateVote = (myPollResult: 'up' | 'down') => {
    console.log('Update vote called with myPollResult:', myPollResult);
    mutate(myPollResult);
  };

  return { updateVote };
};
