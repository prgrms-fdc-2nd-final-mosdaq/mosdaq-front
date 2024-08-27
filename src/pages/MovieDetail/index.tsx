import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { Route, useParams } from 'react-router-dom';
import { useGetMovieDetail } from '@/hooks/api/movie-detail/useGetMovieDetail';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@/components/common/Tooltip';
import { useGetPollBox } from '@/hooks/api/movie-detail/useGetPollBox';
import { useGetStockInfo } from '@/hooks/api/movie-detail/useGetStockInfo';
import MovieDetailAfterOpen from '@/components/movieDetail/MovieDetailAfterOpen';
import MovieDetailBeforeOpen from '@/components/movieDetail/MovieDetailBeforeOpen';
import { getTodayYYYYMMDD } from '@/utils/format';

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
  console.log(getTodayYYYYMMDD()); // 오늘 날짜 출력
  console.log(movieDetail.movieOpenDate); // 영화 개봉일 출력
  console.log(getTodayYYYYMMDD() < movieDetail.movieOpenDate); // 비교 결과 출력
  const handleUpVote = () => {
    console.log('오른다 선택됨');
  };

  const handleDownVote = () => {
    console.log('내린다 선택됨');
  };

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
          {getTodayYYYYMMDD() < movieDetail.movieOpenDate ? (
            <MovieDetailBeforeOpen
              movieDetail={movieDetail}
              pollBox={pollBox}
              // stockMovieInfo={stockMovieInfo}
            />
          ) : (
            <MovieDetailAfterOpen
              movieDetail={movieDetail}
              pollBox={pollBox}
              stockMovieInfo={stockMovieInfo}
            />
          )}
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

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  margin-left: 40px;
  width: 100%;
`;
