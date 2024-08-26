import { IMovie } from '@/models/main-movie.model';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IMovieItemProps {
  movieData: IMovie;
}

export default function MovieListItem({ movieData }: IMovieItemProps) {
  return (
    <StyledMovieItem>
      <Link to={`/movie-list/${movieData.movieId}`}>
        <StyledMoviePoster
          src={movieData.posterUrl[0]}
          alt={movieData.movieTitle}
        />
      </Link>
    </StyledMovieItem>
  );
}

const StyledMovieItem = styled.div`
  width: 300px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const StyledMoviePoster = styled.img`
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.025);
  }
`;
