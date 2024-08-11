import React from 'react';
import styled from 'styled-components';
import MyMovieItem from './MyMovieItem';

export default function MyMovieGrid() {
  return (
    <StyledMyMovieGrid>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
        <MyMovieItem />
      ))}
    </StyledMyMovieGrid>
  );
}

const StyledMyMovieGrid = styled.section`
  width: 1142px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 28px;
`;
