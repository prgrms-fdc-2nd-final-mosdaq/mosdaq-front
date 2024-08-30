import colors from '@/constants/colors';
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
      {movieData.myPollResult && <AlreadyVote>투표함</AlreadyVote>}

      <Link to={`/movie-list/${movieData.movieId}`}>
        <StyledMoviePoster
          className="img-hover-effect"
          src={movieData.posterUrl[0]}
          alt={movieData.movieTitle}
          loading="lazy"
        />
      </Link>
    </StyledMovieItem>
  );
}

// TODO: 투표 결과에 따라 스타일 변경
const StyledMovieItem = styled.div`
  width: 300px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const StyledMoviePoster = styled.img`
  width: 100%;
  height: 100%;
  /* height: auto; */
`;

const AlreadyVote = styled.div`
  position: absolute;
  background-color: ${colors.black};
  color: ${colors.white};
  padding: 5px 10px;
`;
