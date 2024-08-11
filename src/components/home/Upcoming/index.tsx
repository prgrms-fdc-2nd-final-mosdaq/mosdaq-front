import React, { useEffect } from 'react';
import arrow from '@/assets/arrow.svg';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Txt } from '../../common/Txt';
import { useCarousel } from '@/hooks/useCarousel';
import { useMovieStore } from '@/store/useMovieStore';

const Carousel: React.FC = () => {
  const { movieList } = useMovieStore();
  const { currentMovies, nextSlide, prevSlide } = useCarousel(movieList);

  return (
    <CarouselContainer>
      <Arrow direction="left" onClick={prevSlide} />
      <ImageWrapper>
        {currentMovies.map((movie) => (
          <ImageContainer key={movie.movieId}>
            <Image src={movie.posterUrl} alt={movie.movieTitle} />
            <Title>{movie.movieTitle}</Title>
          </ImageContainer>
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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const Image = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${colors.black};
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

export default function Upcoming() {
  const { fetchMovies, isLoading } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (isLoading) {
    return <Txt>Loading...</Txt>;
  }

  return (
    <div>
      <Txt typography="h1">개봉 예정 영화</Txt>
      <Carousel />
    </div>
  );
}
