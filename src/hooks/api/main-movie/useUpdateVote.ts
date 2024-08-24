import { fetchPostPollMovie } from '@/apis/main-movie.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IMovie } from '@/models/main-movie.model';

export const useUpdateVote = (movieId: number) => {
  const queryClient = useQueryClient();

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

      // 캐시된 데이터를 가져옴
      const cachedMovies = queryClient.getQueryData<{ movieList: IMovie[] }>([
        'pollingMovies',
      ]);

      if (cachedMovies) {
        const updatedMovies = cachedMovies.movieList.map((movie) => {
          if (movie.movieId === movieId) {
            const updatedMovie: IMovie = {
              ...movie,
              myPollResult: variables,
              up: variables === 'up' ? movie.up + 1 : movie.up,
              down: variables === 'down' ? movie.down + 1 : movie.down,
            };

            return updatedMovie;
          }
          return movie;
        });

        // 캐시 업데이트
        queryClient.setQueryData(['pollingMovies'], {
          ...cachedMovies,
          movieList: updatedMovies,
        });
      } else {
        console.error('Movie not found in cache');
      }
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
