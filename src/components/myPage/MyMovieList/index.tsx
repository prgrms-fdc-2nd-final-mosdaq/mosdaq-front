import { Txt } from '@/components/common/Txt';
import React from 'react';
import styled from 'styled-components';
import MyMovieListGrid from './MyMovieListGrid';
import MyMovieFilter from './MyMovieFilter';

export default function MyMovieList() {
  return (
    <StyledMyMovieList>
      <StyledMyMovieListTitle>
        <Txt typography="Pretendard40bold">{`최근 투표한 영화들`}</Txt>
      </StyledMyMovieListTitle>
      <MyMovieFilter />
      <MyMovieListGrid />
    </StyledMyMovieList>
  );
}

const StyledMyMovieList = styled.section``;

const StyledMyMovieListTitle = styled.div`
  margin-bottom: 40px;
`;
