import arrow from '../../../assets/images/main/arrow.png';
import styled from 'styled-components';
import { IMovie } from '../../../models/main-movie.model';
import { useCarousel } from '@/hooks/useCarousel';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';
import upIcon from '../../../assets/images/main/mainUpBtn.png';
import downIcon from '../../../assets/images/main/mainDownBtn.png';

interface CarouselProps {
  movieList: IMovie[];
}

export default function Carousel({ movieList }: CarouselProps) {
  console.log(movieList);
  const { currentMovies, nextSlide, prevSlide } = useCarousel(movieList);

  return (
    <CarouselContainer>
      <Arrow direction="left" onClick={prevSlide} />
      <ImageWrapper>
        {currentMovies.map((movie) => (
          <ImageContainer key={movie.movieId}>
            <Image src={movie.posterUrl[0]} alt={movie.movieTitle} />
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
  margin-top: 20px;
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

const VotingStatus = ({ myPollResult }: { myPollResult: string }) => (
  <VotingStatusContainer>
    <Txt typography="Pretendard20bold" color="watcha">
      {myPollResult ? 'Voted' : 'Voting Now'}
    </Txt>
  </VotingStatusContainer>
);

const VotingStatusContainer = styled.div`
  margin-top: 15px;
  padding: 8px 16px;
  border: 2px solid;
  border-radius: 12px;
  text-align: center;
  color: ${colors.watcha};
  background-color: ${colors.white};
`;

const VoteButtons = () => (
  <VoteContainer>
    <VoteButtonWrapper>
      <VoteButton>
        <Icon src={upIcon} alt="UpImg" />
      </VoteButton>
      <VoteText typography="Pretendard20bold" color="watcha">
        상승
      </VoteText>
    </VoteButtonWrapper>
    <VsText typography="Pretendard24bold" color="watcha">
      vs
    </VsText>
    <VoteButtonWrapper>
      <VoteButton>
        <Icon src={downIcon} alt="DownImg" />
      </VoteButton>
      <VoteText typography="Pretendard20bold" color="watcha">
        하락
      </VoteText>
    </VoteButtonWrapper>
  </VoteContainer>
);

const VoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const VoteButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoteButton = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 40px;
  height: 44px;
`;

const VoteText = styled(Txt)`
  margin-top: 5px;
`;

const VsText = styled(Txt)`
  margin: 0 20px;
`;
