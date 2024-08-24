import arrow from '../../../assets/images/main/arrow.png';
import styled from 'styled-components';
import { IMovie } from '../../../models/main-movie.model';
import { useCarousel } from '@/hooks/useCarousel';
import { Txt } from '@/components/common/Txt';
import VoteButtons from './voteButtons';
import VotingStatus from './votingStatus';
import { useNavigate } from 'react-router-dom';

interface CarouselProps {
  movieList: IMovie[];
}

export default function Carousel({ movieList }: CarouselProps) {
  console.log(movieList);
  const { currentMovies, nextSlide, prevSlide } = useCarousel(movieList);
  const navigate = useNavigate();

  const handlePosterClick = (movieId: number) => {
    navigate(`/movie-list/${movieId}`);
  };

  return (
    <CarouselContainer>
      <Arrow direction="left" onClick={prevSlide} />
      <ImageWrapper>
        {currentMovies.map((movie) => (
          <ImageContainer key={movie.movieId}>
            <Image
              src={movie.posterUrl[0]}
              alt={movie.movieTitle}
              onClick={() => handlePosterClick(movie.movieId)}
            />
            <Title typography="Pretendard20bold">{movie.movieTitle}</Title>
            <VotingStatus myPollResult={movie.myPollResult} />
            <VoteButtons />
          </ImageContainer>
        ))}
      </ImageWrapper>
      <Arrow direction="right" onClick={nextSlide} />
    </CarouselContainer>
  );
}

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
  cursor: pointer;
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
