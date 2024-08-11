import React, { useState } from 'react';
import arrow from '../../../assets/images/arrow.png';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Button } from '../../common/Button';
import { Txt } from '../../common/Txt';

interface Movie {
  movieId: number;
  movieTitle: string;
  posterUrl: string;
  up: number;
  down: number;
  pollCount: number;
  myPollResult: string;
}

interface CarouselProps {
  movieList: Movie[];
}

const Carousel: React.FC<CarouselProps> = ({ movieList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movieList.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movieList.length - 1 : prevIndex - 1,
    );
  };

  return (
    <CarouselContainer>
      <Arrow direction="left" onClick={prevSlide} />
      <ImageWrapper>
        {movieList.slice(currentIndex, currentIndex + 3).map((movie, index) => (
          <Image
            src={movie.posterUrl}
            alt={movie.movieTitle}
            key={movie.movieId}
          />
        ))}
      </ImageWrapper>
      <Arrow direction="right" onClick={nextSlide} />
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ImageWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Image = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin: 0 10px;
`;

const Arrow = styled.div<{ direction: 'left' | 'right' }>`
  width: 30px;
  height: 30px;
  background-image: url(${arrow});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  user-select: none;
  position: absolute;
  top: 50%;
  transform: ${({ direction }) =>
    direction === 'left'
      ? 'translateY(-50%) rotate(180deg)'
      : 'translateY(-50%)'};
  z-index: 1;
  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
`;

const movieData = {
  movieList: [
    {
      movieId: 1,
      movieTitle: 'Movie 1',
      posterUrl: 'https://via.placeholder.com/200x150?text=Movie+1',
      up: 0,
      down: 0,
      pollCount: 0,
      myPollResult: 'none',
    },
    {
      movieId: 2,
      movieTitle: 'Movie 2',
      posterUrl: 'https://via.placeholder.com/200x150?text=Movie+2',
      up: 0,
      down: 0,
      pollCount: 0,
      myPollResult: 'none',
    },
    {
      movieId: 3,
      movieTitle: 'Movie 3',
      posterUrl: 'https://via.placeholder.com/200x150?text=Movie+3',
      up: 0,
      down: 0,
      pollCount: 0,
      myPollResult: 'none',
    },
    {
      movieId: 4,
      movieTitle: 'Movie 4',
      posterUrl: 'https://via.placeholder.com/200x150?text=Movie+4',
      up: 0,
      down: 0,
      pollCount: 0,
      myPollResult: 'none',
    },
    {
      movieId: 5,
      movieTitle: 'Movie 5',
      posterUrl: 'https://via.placeholder.com/200x150?text=Movie+5',
      up: 0,
      down: 0,
      pollCount: 0,
      myPollResult: 'none',
    },
  ],
  movieListCount: 5,
};

export default function Upcoming() {
  return (
    <div>
      <Txt typography="h1">개봉 예정 영화</Txt>
      <Carousel movieList={movieData.movieList} />
    </div>
  );
}
