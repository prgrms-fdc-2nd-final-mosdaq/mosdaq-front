import { useEffect, useState } from 'react';
import upIcon from '../../../assets/images/main/mainUpBtn.png';
import downIcon from '../../../assets/images/main/mainDownBtn.png';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { useUpdateVote } from '@/hooks/api/main-movie/useUpdateVote';
import { IMovie } from '@/models/main-movie.model';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchGetMainPollingMovie } from '@/apis/main-movie.api';

interface VoteButtonsProps {
  movieId: IMovie['movieId'];
}

export default function VoteButtons({ movieId }: VoteButtonsProps) {
  const queryClient = useQueryClient();
  const { updateVote } = useUpdateVote(movieId);
  const [voted, setVoted] = useState(false);

  // 투표 비율을 가져오는 쿼리
  const { data: pollingMovies } = useQuery({
    queryKey: ['pollingMovies'],
    queryFn: fetchGetMainPollingMovie,
  });

  // 해당 영화의 비율 계산
  const currentMovie = pollingMovies?.movieList.find(
    (movie) => movie.movieId === movieId,
  );

  // 총 투표 수를 계산
  const totalVotes = currentMovie ? currentMovie.up + currentMovie.down : 0;

  // 비율 계산 소수 첫째자리에서 반올림
  const upRatio =
    currentMovie && totalVotes > 0
      ? ((currentMovie.up / totalVotes) * 100).toFixed(1)
      : '0.0';

  const downRatio =
    currentMovie && totalVotes > 0
      ? ((currentMovie.down / totalVotes) * 100).toFixed(1)
      : '0.0';

  const handleVoteUpdate = async (voteType: 'up' | 'down') => {
    await updateVote(voteType);
    setVoted(true);

    // 최신 투표 결과를 가져와 캐시 업데이트
    queryClient.setQueryData(['pollingMovies'], (oldData: any) => {
      if (!oldData) return oldData;

      const updatedMovieList = oldData.movieList.map((movie: IMovie) =>
        movie.movieId === movieId
          ? {
              ...movie,
              up: voteType === 'up' ? movie.up + 1 : movie.up,
              down: voteType === 'down' ? movie.down + 1 : movie.down,
              myPollResult: voteType,
            }
          : movie,
      );

      return {
        ...oldData,
        movieList: updatedMovieList,
      };
    });
  };

  useEffect(() => {
    // 캐시에서 최신 데이터를 불러와 상태를 업데이트
    const cachedMovies = queryClient.getQueryData<{ movieList: IMovie[] }>([
      'pollingMovies',
    ]);

    const updatedMovie = cachedMovies?.movieList.find(
      (movie) => movie.movieId === movieId,
    );

    if (updatedMovie) {
      setVoted(updatedMovie.myPollResult !== null);
    }
  }, [movieId, queryClient]);

  return (
    <VoteContainer>
      <VoteButtonWrapper>
        {voted ? (
          <VoteText typography="Pretendard20bold" color="watcha">
            {upRatio}%
          </VoteText>
        ) : (
          <>
            <VoteButton
              src={upIcon}
              alt="upImg"
              onClick={() => handleVoteUpdate('up')}
            />
            <VoteText typography="Pretendard20bold" color="watcha">
              상승
            </VoteText>
          </>
        )}
      </VoteButtonWrapper>
      <VsText typography="Pretendard24bold" color="watcha">
        vs
      </VsText>
      <VoteButtonWrapper>
        {voted ? (
          <VoteText typography="Pretendard20bold" color="watcha">
            {downRatio}%
          </VoteText>
        ) : (
          <>
            <VoteButton
              src={downIcon}
              alt="DownImg"
              onClick={() => handleVoteUpdate('down')}
            />
            <VoteText typography="Pretendard20bold" color="watcha">
              하락
            </VoteText>
          </>
        )}
      </VoteButtonWrapper>
    </VoteContainer>
  );
}

const VoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 28px;
`;

const VoteButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoteButton = styled.img`
  width: 40px;
  height: 44px;
  cursor: pointer;
`;

const VoteText = styled(Txt)`
  margin-top: 5px;
`;

const VsText = styled(Txt)`
  margin: 0 20px;
`;
