import MovieDetailAfterOpen from '@/components/movieDetail/MovieDetailAfterOpen';
import MovieDetailBeforeOpen from '@/components/movieDetail/MovieDetailBeforeOpen';
import MovieDetailPoster from '@/components/movieDetail/MovieDetailPoster';
import { useGetMovieDetail } from '@/hooks/api/movie-detail/useGetMovieDetail';
import { useGetPollBox } from '@/hooks/api/movie-detail/useGetPollBox';
import { getTodayYYYYMMDD } from '@/utils/date';

import React, { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

export default function MovieDetail() {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();

  const { movieDetail } = useGetMovieDetail(movieId || '');
  const { pollBox } = useGetPollBox(movieId || '');

  if (!movieId) return null;

  return (
    <PageContainer>
      <div className="wrapper">
        <MovieDetailPoster movieDetail={movieDetail} />

        <RightContainer>
          {getTodayYYYYMMDD() < movieDetail.movieOpenDate ? (
            <MovieDetailBeforeOpen movieId={movieId} movieDetail={movieDetail} pollBox={pollBox} />
          ) : (
            <MovieDetailAfterOpen movieDetail={movieDetail} pollBox={pollBox} movieId={movieId} />
          )}
        </RightContainer>
      </div>
    </PageContainer>
  );
}

// 전체 페이지를 감싸는 컨테이너
const PageContainer = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  margin: 0 auto;
  min-height: calc(100vh - 77px);
  height: 100%;
  display: flex;
  align-items: center;

  .wrapper {
    display: flex;
    width: 100%;
    height: max-content;
    box-sizing: border-box;
    align-items: center;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  margin-left: 40px;
  width: 100%;
  max-width: 750px;
`;
