import { Txt } from '@/components/common/Txt';
import React from 'react';
import styled from 'styled-components';
import MyMovieGrid from './MyMovieGrid';

export default function MyMovieList() {
  return (
    <StyledMyMovieList>
      <StyledMyMovieListTitle>
        <Txt typography="Pretendard40bold">{`최근 투표한 영화들`}</Txt>
      </StyledMyMovieListTitle>
      <StyledMovieFilter>
        <Txt typography="Pretendard24bold">{2024}</Txt>
      </StyledMovieFilter>
      <MyMovieGrid />
    </StyledMyMovieList>
  );
}

const StyledMyMovieList = styled.section``;

const StyledMyMovieListTitle = styled.div`
  margin-bottom: 40px;
`;

const StyledMovieFilter = styled.div`
  margin-bottom: 40px;
`;
