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
import useAuthStore from '@/store/authStore';
import { useAlert } from '@/hooks/useAlert';
import { MySnackbar } from '@/components/common/Snackbar';

export const usePollMovie = (movieId: string) => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStore();
  const { updateUserPoint } = useUserProfile();
  const { showConfirm } = useAlert();
  const { openSnackbar, SnackbarComponent } = MySnackbar();

  const { mutate } = useMutation({
    mutationFn: async (
      pollResult: 'up' | 'down',
    ): Promise<{ point: number; rank: number }> => {
      return fetchPollMovie(+movieId, pollResult);
    },
    onMutate(pollResult: 'up' | 'down') {
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
          // console.log('shallow', shallow);
          // console.log('shallow', shallow.pages[targetMoviePagesIndex]);

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
              // console.log('shallow,', shallow);
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
            newMovie = { ...mainTargetMovie };
          } else {
            const movieDetail: IMovieDetail | undefined =
              queryClient.getQueryData(['movieDetail', movieId]);
            if (movieDetail) {
              newMovie = {
                movieId: +movieId,
                movieTitle: movieDetail.movieTitle,
                posterUrl: movieDetail.posterUrl,
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
    onSuccess: (_data: { point: number; rank: number }, _variables) => {
      // openSnackbar({
      //   message: `투표가 성공적으로 완료되었습니다! 현재 ${data.point} 포인트입니다.`,
      //   autoHideDuration: 6000,
      // });
    },
    onError: (_error, _variables, context: any) => {
      const {
        prevPollBox,
        prevMainPollingMovies,
        prevMovieListResponse,
        prevMyPageMovieListResponse,
      } = context;

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
    if (!isLoggedIn) {
      showConfirm(
        `로그인 한 유저만 투표가 가능합니다.\n로그인 화면으로 이동하시겠습니까?`,
        () => {
          window.location.href = '/login';
        },
      );
      return;
    }

    mutate(pollResult);
  };

  return {
    pollMovie,
    SnackbarComponent,
  };
};
