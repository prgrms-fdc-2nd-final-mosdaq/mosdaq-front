import { IMovie } from './../models/main-movie.model';
import { create } from 'zustand';
import { fetchPostPollMovie } from '../apis/main-movie.api';

type State = {
  movies: IMovie[];
  isVoted: IMovie['myPollResult'] | null;
};

type Action = {
  setMovies: (movies: IMovie[]) => void;
  setIsVoted: (isVoted: IMovie['myPollResult']) => void;
  updateMovieVote: (movieId: number, voteType: IMovie['myPollResult']) => void;
};

const useVoteStore = create<State & Action>((set, get) => ({
  movies: [],
  isVoted: null,
  setIsVoted: (isVoted) => set(() => ({ isVoted: isVoted })),
  setMovies: (movies) => set(() => ({ movies })),
  updateMovieVote: async (movieId, voteType) => {
    console.log(
      `updateMovieVote called with movieId: ${movieId}, voteType: ${voteType}`,
    ); // 함수 호출 확인
    const movies = get().movies;
    const movie = movies.find((m) => m.movieId === movieId);

    if (movie) {
      const updatedMovie: IMovie = {
        ...movie,
        up: voteType === 'up' ? movie.up + 1 : movie.up,
        down: voteType === 'down' ? movie.down + 1 : movie.down,
        pollCount: movie.pollCount + 1,
        myPollResult: voteType,
      };
      console.log(
        'Updated movie object before sending to server:',
        updatedMovie,
      ); // 서버로 보내기 전 업데이트된 영화 정보

      // 서버에 업데이트된 투표 결과를 보내는 API 호출
      try {
        const updatedMovieFromServer = await fetchPostPollMovie(
          movieId,
          updatedMovie,
        );
        console.log(
          'Updated movie object from server:',
          updatedMovieFromServer,
        ); // 서버에서 받은 응답 데이터

        // 서버 응답을 반영하여 상태 업데이트
        set((state) => ({
          movies: state.movies.map((m) =>
            m.movieId === movieId ? updatedMovieFromServer : m,
          ),
          isVoted: voteType, // 투표 상태를 업데이트
        }));
      } catch (error) {
        console.error('Failed to update vote:', error);
        // 필요한 경우 오류 처리 로직 추가
      }
    }
  },
}));

export default useVoteStore;
