//   const { pollBox } = useGetPollBox(movieId);
//   const { stockMovieInfo } = useGetStockInfo(movieId);
//   const { movieDetail } = useGetMovieDetail(movieId);

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
          <MovieTitle typography="Pretendard36bold">
            {movieDetail.movieTitle}
          </MovieTitle>
          <MovieInfo typography="Pretendard16regular" color="greyscale10">
            <p>Director: {movieDetail.movieDirector}</p>
            <p>Release Date: {movieDetail.movieOpenDate}</p>
          </MovieInfo>
        </PosterContainer>
        <RightContainer>
          <DescriptionContainer>
            <QuestionContainer typography="Pretendard20bold">
              <p>
                <FcAdvertising /> '{movieDetail.movieTitle}' 개봉 후 제작사의
                주가가 오를까요? 내릴까요?
              </p>
            </QuestionContainer>
            <MovieDescription
              typography="Pretendard16regular"
              color="greyscale10"
            >
              {movieDetail.movieDescription}
            </MovieDescription>
          </DescriptionContainer>
          <Divider />
          <ScoreInfo typography="Pretendard24bold">
            🎯 승리팀을 맞추면 10점 획득!
          </ScoreInfo>
          <VoteContainer>
            <VoteButton onUpVote={handleUpVote} onDownVote={handleDownVote} />
          </VoteContainer>
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
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
`;

const PosterImage = styled.img`
  width: 400px;
  height: 570px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const MovieTitle = styled(Txt)`
  align-self: flex-start;
  margin-bottom: 10px;
`;

const MovieInfo = styled(Txt)`
  align-self: flex-start;
`;

// 오른쪽 섹션 (간단 설명 및 투표)
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 40px;
  width: 60%;
`;

const QuestionContainer = styled(Txt)`
  margin-bottom: 40px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
`;

const MovieDescription = styled(Txt)`
  line-height: 1.6;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.greyscale8};
  margin: 20px 0;
`;

const ScoreInfo = styled(Txt)`
  margin-bottom: 20px;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
