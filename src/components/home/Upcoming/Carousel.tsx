import arrow from '../../../assets/images/main/arrow.png';
import styled from 'styled-components';
import { IMovie } from '@/models/main-movie.model';
import VoteButtons from './voteButtons';
import VotingStatus from './votingStatus';
import { Txt } from '@/components/common/Txt';
import { useCarousel } from '@/hooks/main-movie/useCarousel';
import { useEffect } from 'react';
interface CarouselProps {
  movieList: IMovie[];
}

export default function Carousel({ movieList }: CarouselProps) {
  const { updatedMovie, nextSlide, prevSlide } = useCarousel(movieList);

  return (
    <CarouselContainer>
      <Arrow direction="left" onClick={prevSlide} />
      <ImageWrapper>
        <ImageContainer key={updatedMovie.movieId}>
          <Image
            src={updatedMovie.posterUrl[0]}
            alt={updatedMovie.movieTitle}
          />
          <Title typography="Pretendard20bold">{updatedMovie.movieTitle}</Title>
          <VotingStatus myPollResult={updatedMovie.myPollResult} />
          <VoteButtons movieId={updatedMovie.movieId} />
        </ImageContainer>
      </ImageWrapper>
      <Arrow direction="right" onClick={nextSlide} />
    </CarouselContainer>
  );
}

// 스타일 컴포넌트
const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 100px;
`;

const ImageWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  padding: 0 50px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 52px;
`;

const Image = styled.img`
  width: 400px;
  height: 570px;
  object-fit: cover;
`;

const Title = styled(Txt)`
  margin-top: 30px;
  text-align: center;
`;

const Arrow = styled.div<{ direction: 'left' | 'right' }>`
  width: 96px;
  height: 96px;
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
