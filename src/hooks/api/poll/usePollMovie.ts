import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchPollMovie } from '../../../apis/poll.api';
import { IPollBox } from '@/models/poll.model';
import useUserProfile from '@/hooks/user/useUserProfile';
import { IMovie, IPollingMovies } from '@/models/main-movie.model';
import { IMovieListResponse } from '@/models/movie-list.model';
import { IMovieDetail } from '@/models/movie.model';

export const usePollMovie = (movieId: string) => {
  const queryClient = useQueryClient();
  const { updateUserPoint } = useUserProfile();
  const { mutate } = useMutation({
    // mutationFn: async (pollResult: 'up' | 'down') =>
    //   fetchPollMovie(movieId, pollResult),
    // mutationFn: async (): Promise<IPollBox> => {
    //   return {} as IPollBox; // 빈 객체를 IPollBox 타입으로 캐스팅
    // },
    mutationFn: async (): Promise<IPollBox> => {
      // 특정 조건에 따라 실패
      const shouldFail = true; // 실패 조건

      if (shouldFail) {
        return Promise.reject(new Error('API 요청 실패')); // 실패 반환
      }

      return {} as IPollBox; // 성공 시 빈 객체 반환
    },
    onMutate(pollResult: string) {
      // pollBox update
      const pollBoxData: IPollBox | undefined = queryClient.getQueryData([
        'movieDetail',
        'pollBox',
        movieId,
      ]);
      let newPollBox: IPollBox = {} as IPollBox;
      if (pollBoxData) {
        const shallow = { ...pollBoxData };
        // 이미 up에 투표를 했을 때
        if (pollBoxData.pollResult === 'up') {
          // 투표를 바꾸는 경우만 고려
          if (pollResult === 'down') {
            shallow.down++;
            shallow.up--;
            shallow.pollResult = 'down';
          }
        } else if (pollBoxData.pollResult === 'down') {
          if (pollResult === 'up') {
            shallow.down--;
            shallow.up++;
            shallow.pollResult = 'up';
          }
        } else {
          if (pollResult === 'up') {
            shallow.up++;
            shallow.total++;
            shallow.pollResult = 'up';
          } else if (pollResult === 'down') {
            shallow.down++;
            shallow.total++;
            shallow.pollResult = 'down';
          }
          // 투표 시 5포인트
          updateUserPoint(5);
        }
        newPollBox = { ...shallow };
        queryClient.setQueryData(['movieDetail', 'pollBox', movieId], shallow);
      }

      // main update
      const mainPollingMovies: IPollingMovies | undefined =
        queryClient.getQueryData(['pollingMovies']);
      // 마이페이지에서 재사용하기 위해
      let mainTargetMovie: IMovie = {} as IMovie;
      if (mainPollingMovies?.movieList) {
        const targetMovieIndex = mainPollingMovies.movieList.findIndex(
          (movie) => movie.movieId === +movieId,
        );
        if (targetMovieIndex !== -1) {
          const shallow: IMovie[] = [...mainPollingMovies.movieList];
          shallow[targetMovieIndex] = {
            ...mainPollingMovies.movieList[targetMovieIndex],
          };
          if (shallow[targetMovieIndex].myPollResult === 'up') {
            if (pollResult === 'down') {
              shallow[targetMovieIndex].down++;
              shallow[targetMovieIndex].up--;
              shallow[targetMovieIndex].myPollResult = 'down';
            }
          } else if (shallow[targetMovieIndex].myPollResult === 'down') {
            if (pollResult === 'up') {
              shallow[targetMovieIndex].down--;
              shallow[targetMovieIndex].up++;
              shallow[targetMovieIndex].myPollResult = 'up';
            }
          } else {
            if (pollResult === 'up') {
              shallow[targetMovieIndex].up++;
              shallow[targetMovieIndex].myPollResult = 'up';
            } else if (pollResult === 'down') {
              shallow[targetMovieIndex].down++;
              shallow[targetMovieIndex].myPollResult = 'down';
            }
          }
          mainTargetMovie = { ...shallow[targetMovieIndex] };
          console.log('shallow', shallow);
          queryClient.setQueryData(['pollingMovies'], {
            movieList: shallow,
            movieListCount: mainPollingMovies.movieListCount,
          });
        }
      }

      //movie 목록 update
      const movieListResponse: InfiniteData<IMovieListResponse[]> | undefined =
        queryClient.getQueryData(['movieList', '?sort=DESC&poll=true']);

      if (movieListResponse && 'pages' in movieListResponse) {
        const shallow = {
          ...movieListResponse,
        };

        const allMovieResponses = movieListResponse.pages.flatMap(
          (page) => page,
        );

        const targetMoviePagesIndex = allMovieResponses.findIndex(
          (movieResponse) =>
            movieResponse.movieList.some((movie) => movie.movieId === +movieId),
        );

        if (targetMoviePagesIndex !== -1) {
          console.log('shallow', shallow);
          console.log('shallow', shallow.pages[targetMoviePagesIndex]);

          const movieList =
            shallow.pages.flat()[targetMoviePagesIndex].movieList;
          if (movieList) {
            const movieListIndex = shallow.pages
              .flat()
              [
                targetMoviePagesIndex
              ].movieList.findIndex((movie) => movie.movieId === +movieId);

            if (movieListIndex !== -1) {
              const prevMyPollResult =
                shallow.pages.flat()[targetMoviePagesIndex].movieList[
                  movieListIndex
                ].myPollResult;

              if (prevMyPollResult === 'up') {
                if (pollResult === 'down') {
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].down++;
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].up--;
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].myPollResult = 'down';
                }
              } else if (prevMyPollResult === 'down') {
                if (pollResult === 'up') {
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].down--;
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].up++;
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].myPollResult = 'up';
                }
              } else {
                if (pollResult === 'up') {
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].up++;
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].myPollResult = 'up';
                } else if (pollResult === 'down') {
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].down++;
                  shallow.pages.flat()[targetMoviePagesIndex].movieList[
                    movieListIndex
                  ].myPollResult = 'down';
                }
              }
              console.log('shallow,', shallow);
              queryClient.setQueryData(
                ['movieList', '?sort=DESC&poll=true'],
                shallow,
              );
            }
          }
        }
      }

      // mypage optimistic update
      const myPageMovieListResponse:
        | InfiniteData<IMovieListResponse[]>
        | undefined = queryClient.getQueryData([
        'myMovieList',
        '?sort=DESC&poll=true',
      ]);

      if (myPageMovieListResponse && 'pages' in myPageMovieListResponse) {
        const shallow = {
          ...myPageMovieListResponse,
        };

        let newMovie: IMovie = {} as IMovie;

        const movieList = shallow.pages.flat()[0].movieList;
        if (movieList) {
          if (mainPollingMovies?.movieList) {
            // d여기 test 안 함
            newMovie = { ...mainTargetMovie };
          } else {
            const movieDetail: IMovieDetail | undefined =
              queryClient.getQueryData(['movieDetail', movieId]);
            if (movieDetail) {
              newMovie = {
                movieId: +movieId,
                movieTitle: movieDetail.movieTitle,
                posterUrl: movieDetail.moviePoster,
                up: newPollBox.up,
                down: newPollBox.down,
                myPollResult: newPollBox.pollResult,
              };
            }
          }

          shallow.pages.flat()[0].movieList.unshift(newMovie);
          shallow.pages.flat()[0].movieListCount++;
          queryClient.setQueryData(
            ['myMovieList', '?sort=DESC&poll=true'],
            shallow,
          );
        }
      }
      const prevPollBox = pollBoxData;
      const prevMainPollingMovies = mainPollingMovies;
      const prevMovieListResponse = movieListResponse;
      const prevMyPageMovieListResponse = myPageMovieListResponse;
      return {
        prevPollBox,
        prevMainPollingMovies,
        prevMovieListResponse,
        prevMyPageMovieListResponse,
      };
    },

    onSuccess: () => {},
    onError: (error, variables, context: any) => {
      const {
        prevPollBox,
        prevMainPollingMovies,
        prevMovieListResponse,
        prevMyPageMovieListResponse,
      } = context;
      console.log('context : ', context);
      if (prevPollBox) {
        queryClient.setQueryData(
          ['movieDetail', 'pollBox', movieId],
          prevPollBox,
        );
      }
      if (prevMainPollingMovies) {
        queryClient.setQueryData(['pollingMovies'], prevMainPollingMovies);
      }
      if (prevMovieListResponse) {
        queryClient.setQueryData(
          ['movieList', '?sort=DESC&poll=true'],
          prevMovieListResponse,
        );
      }
      if (prevMyPageMovieListResponse) {
        queryClient.setQueryData(
          ['myMovieList', '?sort=DESC&poll=true'],
          context,
        );
      }
    },
  });

  const pollMovie = (pollResult: 'up' | 'down') => {
    mutate(pollResult);
  };

  return {
    pollMovie,
  };
};
