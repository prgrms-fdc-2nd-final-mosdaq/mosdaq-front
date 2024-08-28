import { IMovie } from '@/models/main-movie.model';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IMyMovieItemProps {
  movieData: IMovie;
}

export default function MyMovieItem({ movieData }: IMyMovieItemProps) {
  return (
    <StyledMyMovieItem>
      <Link to={`/movie-list/${movieData.movieId}`}>
        <StyledMoviePoster
          className="img-hover-effect"
          src={movieData.posterUrl[0]}
          alt={movieData.movieTitle}
          loading="lazy"
        />
      </Link>
    </StyledMyMovieItem>
  );
}

const StyledMyMovieItem = styled.div`
  width: 350px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const StyledMoviePoster = styled.img`
  width: 100%;
  height: auto;
`;
