import React from 'react';
import styled from 'styled-components';

export default function MyMovieItem() {
  return (
    <StyledMyMovieItem>
      <img src="https://via.placeholder.com/350x500" alt="영화 포스터" />
    </StyledMyMovieItem>
  );
}

const StyledMyMovieItem = styled.div`
  width: 350px;
`;
