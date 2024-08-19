// import { fetchPostPollMovie } from '@/apis/main-movie.api';
// import { useMutation } from '@tanstack/react-query';
// import useVoteStore from '@/store/voteStore';

// export const useUpdateVote = (movieId: number) => {
//   const { updateMovieVote, setMovies } = useVoteStore();
//   const { mutate } = useMutation({
//     mutationFn: async (myPollResult: 'up' | 'down') => {
//       console.log(
//         'Mutation function called with movieId:',
//         movieId,
//         'myPollResult:',
//         myPollResult,
//       );
//       return fetchPostPollMovie(movieId, myPollResult);
//     },
//     onSuccess: (data, variables) => {
//       console.log('Vote successful, server response:', data);
//       updateMovieVote(movieId, variables); // 클라이언트 측에서 up/down 값을 업데이트
//     },
//     onError: (error) => {
//       console.error('Vote failed:', error);
//     },
//   });

//   const updateVote = (myPollResult: 'up' | 'down') => {
//     console.log('Update vote called with myPollResult:', myPollResult);
//     mutate(myPollResult);
//   };

//   return { updateVote };
// };

// 클라이언트 측 값 디버깅을 위한 코드
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

      // Fetch request data
      const requestData = { myPollResult };
      console.log('Request data:', requestData);

      try {
        const response = await fetchPostPollMovie(movieId, myPollResult);
        console.log('Server response:', response);
        return response;
      } catch (error) {
        console.error('Error during fetchPostPollMovie:', error);
        throw error; // Re-throw the error to be caught by onError
      }
    },
    onSuccess: (data, variables) => {
      console.log('Vote successful, server response:', data);
      console.log(
        'Calling updateMovieVote with movieId:',
        movieId,
        'variables:',
        variables,
      );

      try {
        // Update movie vote in local store
        updateMovieVote(movieId, variables);

        // Verify if movie is updated in local store
        const updatedMovies = useVoteStore.getState().movies;
        console.log('Updated movies list:', updatedMovies);
        const updatedMovie = updatedMovies.find((m) => m.movieId === movieId);
        if (updatedMovie) {
          console.log('Updated movie data:', updatedMovie);
          console.log('Up count:', updatedMovie.up);
          console.log('Down count:', updatedMovie.down);
        } else {
          console.log('Movie not found in updated movies list');
        }
      } catch (error) {
        console.error('Error in updateMovieVote:', error);
      }
    },
    onError: (error) => {
      console.error('Vote failed:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    },
  });

  const updateVote = (myPollResult: 'up' | 'down') => {
    console.log('Update vote called with myPollResult:', myPollResult);
    mutate(myPollResult);
  };

  return { updateVote };
};
