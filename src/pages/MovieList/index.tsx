import MovieFilter from '@/components/movieList/MovieFilter';
import MovieListGrid from '@/components/movieList/MovieListGrid';
import React from 'react';
import styled from 'styled-components';

export default function MovieListPage() {
  return (
    <StyledMovieListPage>
      <MovieFilter />
      <MovieListGrid />
    </StyledMovieListPage>
  );
}

const StyledMovieListPage = styled.div`
  position: relative;
  max-width: 1920px;
  width: 100%;
  padding: 60px 80px;
`;
