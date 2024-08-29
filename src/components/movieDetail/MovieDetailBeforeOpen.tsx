import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { IMovieDetail } from '@/models/movie.model';
import { IPollBox } from '@/models/poll.model';
import { FcAdvertising } from 'react-icons/fc';
import { dateDifference } from '@/utils/format';
import { Link } from 'react-router-dom';
import colors from '@/constants/colors';
import clockImg from '@/assets/images/movieDetail/clock.svg';
import rightArrow from '@/assets/images/main/arrow.png';
import { usePollMovie } from '@/hooks/api/poll/usePollMovie';
import VoteButton from '@/components/vote/VoteButton';

interface Props {
  movieId: string;
  movieDetail: IMovieDetail;
  pollBox: IPollBox;
}

export default function MovieDetailBeforeOpen({
  movieId,
  movieDetail,
  pollBox,
}: Props) {
  return (
    <>
      <VotingNowTxt typography="Pretendard36bold" color="watcha">
        Now voting
      </VotingNowTxt>

      <Txt typography="Pretendard20bold">
        <FcAdvertising /> '{movieDetail.movieTitle}' 개봉 후&nbsp;
        {/* {stockMovieInfo.companyName}의 주가가 오를까요? 내릴까요? */}
      </Txt>

      <div className="movie-description">
        <p>{movieDetail.movieDescription}</p>
      </div>

      <Divider />

      <ScoreInfo typography="Pretendard24bold">
        🎯 정답을 맞추면 10포인트 획득!
      </ScoreInfo>

      <VoteContainer>
        <VoteButton movieId={movieId} pollBox={pollBox} />
      </VoteContainer>

      <VotingStatus>
        <div className="voting-status-left">
          <Txt typography="Pretendard24bold" color="watcha">
            {dateDifference(movieDetail.movieOpenDate)} 후 종료
          </Txt>
          <VoteNum
            typography="Pretendard24bold"
            color="white"
            className="divide"
          >
            {(pollBox.up + pollBox.down).toLocaleString()} 명 참여 중
          </VoteNum>
        </div>
        <div className="voting-status-right">
          <Link to="/movie-list">
            <Txt
              typography="Pretendard24regular"
              color="black"
              className="move"
            >
              다른 영화 예측
            </Txt>
          </Link>
        </div>
      </VotingStatus>
    </>
  );
}

const VotingStatus = styled.div`
  width: 750px;
  height: 64px;
  border-radius: 20px;
  background-color: ${colors.watcha3};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  .movie-description {
    width: 588px;
    max-height: 128px;
    height: 100%;
    overflow: scroll;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    p {
      font-size: 16px;
      color: ${colors.greyscale10};
      line-height: 1.6;
      text-align: center;
    }
  }

  // 투명 스크롤바
  .movie-description::-webkit-scrollbar {
    display: none;
  }

  .voting-status-left {
    display: flex;
    align-items: center;
  }

  .voting-status-left::before {
    content: '';
    display: block;
    width: 35px;
    height: 35px;
    background-image: url(${clockImg});
    background-size: cover;
    background-position: center;
  }

  .voting-status-right {
    display: flex;
    align-items: center;

    .move {
      display: flex;
      align-items: center;
    }
    .move::after {
      content: '';
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      background-image: url(${rightArrow});
      background-size: cover;
      background-position: center;
    }
  }
`;

const VotingNowTxt = styled(Txt)`
  border: 1px solid ${colors.watcha};
  border-radius: 16px;
  padding: 4px 10px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.greyscale8};
  margin: 10px 0;
`;

const ScoreInfo = styled(Txt)`
  margin-bottom: 20px;
`;

export const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 750px;
  width: 100%;
`;

export const VoteNum = styled(Txt)`
  display: flex;

  &::before {
    content: '/';
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
  }
`;
