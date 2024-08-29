import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetMovieDetail } from '@/hooks/api/movie-detail/useGetMovieDetail';
import { useNavigate } from 'react-router-dom';
import { useGetPollBox } from '@/hooks/api/movie-detail/useGetPollBox';
import MovieDetailAfterOpen from '@/components/movieDetail/MovieDetailAfterOpen';
import MovieDetailBeforeOpen from '@/components/movieDetail/MovieDetailBeforeOpen';
import { getTodayYYYYMMDD } from '@/utils/date';
import MovieDetailPoster from '@/components/movieDetail/MovieDetailPoster';

export default function MovieDetail() {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();

  if (!movieId) return null;

  const { movieDetail } = useGetMovieDetail(movieId);
  const { pollBox } = useGetPollBox(movieId);

  return (
    <PageContainer>
      <div className="wrapper">
        <MovieDetailPoster movieDetail={movieDetail} />

        <RightContainer>
          {getTodayYYYYMMDD() < movieDetail.movieOpenDate ? (
            <MovieDetailBeforeOpen
              movieId={movieId}
              movieDetail={movieDetail}
              pollBox={pollBox}
            />
          ) : (
            <MovieDetailAfterOpen
              movieDetail={movieDetail}
              pollBox={pollBox}
              movieId={movieId}
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
  display: flex;
  align-items: center;
  .wrapper {
    display: flex;
    width: 100%;
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
