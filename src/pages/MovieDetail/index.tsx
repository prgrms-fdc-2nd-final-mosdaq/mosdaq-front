import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';
import { Route, useParams } from 'react-router-dom';
import { useGetMovieDetail } from '@/hooks/api/movie-detail/useGetMovieDetail';
import { IMovieDetail } from '@/models/movie.model';
import { FcAdvertising } from 'react-icons/fc';
import VoteButton from '@/components/vote/voteButton';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@/components/common/Tooltip';
import { useGetPollBox } from '@/hooks/api/movie-detail/useGetPollBox';
import { useGetStockInfo } from '@/hooks/api/movie-detail/useGetStockInfo';
import clockImg from '@/assets/images/movieDetail/clock.svg';
import rightArrow from '@/assets/images/main/arrow.png';
import { Link } from 'react-router-dom';
import { dateDifference } from '@/utils/format';

export default function MovieDetail() {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();

  if (!movieId) return null;
  // useEffect(() => {
  //   if (typeof movieId === 'undefined' || movieId.trim() === '') {
  //     alert('잘못된 movieId입니다. 영화 목록으로 이동합니다');
  //     navigate(`/movie-list/`);
  //   }
  // }, [movieId]);

  const { movieDetail } = useGetMovieDetail(movieId);
  const { pollBox } = useGetPollBox(movieId);
  const { stockMovieInfo } = useGetStockInfo(movieId);
  //   const { movieDetail } = useGetMovieDetail(movieId);
  const handleUpVote = () => {
    console.log('오른다 선택됨');
  };

  const handleDownVote = () => {
    console.log('내린다 선택됨');
  };
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!movieDetail) {
  //   return <div>Movie details not found.</div>;
  // }

  return (
    <PageContainer>
      <div className="wrapper">
        <PosterContainer>
          <PosterImage
            src={movieDetail.moviePoster?.[0]}
            alt={movieDetail.movieTitle}
          />
          <Tooltip text={movieDetail.movieTitle} position="top">
            <EllipsisTxt typography="Pretendard36bold">
              {movieDetail.movieTitle}
            </EllipsisTxt>
          </Tooltip>
          <Txt typography="Pretendard20bold" color="greyscale11">
            {movieDetail.movieOpenDate} 개봉
          </Txt>
          <Txt typography="Pretendard20regular" color="greyscale10">
            감독 {movieDetail.movieDirector}
          </Txt>
          <Txt typography="Pretendard20regular" color="greyscale10">
            제작(배급사) {stockMovieInfo.companyName}
          </Txt>
        </PosterContainer>

        <RightContainer>
          <VotingNowTxt typography="Pretendard36bold" color="watcha">
            voting now
          </VotingNowTxt>

          <Txt typography="Pretendard20bold">
            <FcAdvertising /> '{movieDetail.movieTitle}' 개봉 후&nbsp;
            {stockMovieInfo.companyName}의 주가가 오를까요? 내릴까요?
          </Txt>

          <div className="movie-description">
            <p>{movieDetail.movieDescription}</p>
          </div>

          <Divider />

          <ScoreInfo typography="Pretendard24bold">
            🎯 정답을 맞추면 10포인트 획득!
          </ScoreInfo>

          <VoteContainer>
            <VoteButton onUpVote={handleUpVote} onDownVote={handleDownVote} />
          </VoteContainer>

          <div className="voting-status">
            <div className="voting-status-left">
              <Txt typography="Pretendard24bold" color="watcha">
                {dateDifference(movieDetail.movieOpenDate)} 후 종료
              </Txt>
              <Txt
                typography="Pretendard24bold"
                color="white"
                className="divide"
              >
                {(pollBox.up + pollBox.down).toLocaleString()} 명 참여 중
              </Txt>
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
          </div>
        </RightContainer>
      </div>
    </PageContainer>
  );
}

// 전체 페이지를 감싸는 컨테이너
const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: calc(100vh - 77px);

  .wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
  }
`;

// 왼쪽 섹션 (포스터 및 기본 정보)
const PosterContainer = styled.div`
  /* width: 300px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: 40px;
`;

const PosterImage = styled.img`
  width: 400px;
  height: 570px;
  margin-bottom: 20px;
`;

const EllipsisTxt = styled(Txt)`
  width: 400px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

// 오른쪽 섹션 (간단 설명 및 투표)
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  margin-left: 40px;
  width: 100%;

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

  .voting-status {
    width: 750px;
    height: 64px;
    border-radius: 20px;
    background-color: ${colors.watcha3};

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 10px;

    .voting-status-left {
      display: flex;
      align-items: center;

      .divide {
        display: flex;
      }

      .divide::before {
        content: '/';
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
      }
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
  }
`;

const VotingNowTxt = styled(Txt)`
  border: 1px solid ${colors.watcha};
  border-radius: 16px;
  padding: 4px 10px;
`;

const MovieDescription = styled(Txt)`
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.greyscale8};
  margin: 10px 0;
`;

const ScoreInfo = styled(Txt)`
  margin-bottom: 20px;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
