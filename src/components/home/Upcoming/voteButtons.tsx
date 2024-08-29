import upIcon from '../../../assets/images/main/mainUpBtn.png';
import downIcon from '../../../assets/images/main/mainDownBtn.png';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { IMovie } from '@/models/main-movie.model';
import { usePollMovie } from '@/hooks/api/poll/usePollMovie';
import { calculatePercentages } from '@/utils/math';
import colors from '@/constants/colors';

interface VoteButtonsProps {
  movie: IMovie;
  myPollResult: 'up' | 'down' | null;
}

export default function VoteButtons({ movie, myPollResult }: VoteButtonsProps) {
  const { pollMovie } = usePollMovie(movie.movieId.toString());

  const { upPercentage, downPercentage } = calculatePercentages(
    movie.up,
    movie.down,
  );

  return (
    <VoteContainer>
      <VoteButtonWrapper
        onClick={() => {
          if (!myPollResult) pollMovie('up');
        }}
      >
        {movie.myPollResult ? (
          <VoteText typography="Pretendard20bold" color="watcha">
            {upPercentage}% <br />
            상승
          </VoteText>
        ) : (
          <>
            <VoteButton src={upIcon} alt="upImg" />
            <VoteText typography="Pretendard20bold" color="watcha">
              상승
            </VoteText>
          </>
        )}
      </VoteButtonWrapper>
      <VsText typography="Pretendard24bold" color="watcha">
        vs
      </VsText>
      <VoteButtonWrapper
        onClick={() => {
          if (!myPollResult) pollMovie('down');
        }}
      >
        {movie.myPollResult ? (
          <VoteText typography="Pretendard20bold" color="watcha">
            {downPercentage}% <br />
            하락
          </VoteText>
        ) : (
          <>
            <VoteButton src={downIcon} alt="DownImg" />
            <VoteText typography="Pretendard20bold" color="watcha">
              하락
            </VoteText>
          </>
        )}
      </VoteButtonWrapper>
    </VoteContainer>
  );
}

const VoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 28px;
`;

const VoteButtonWrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.2s ease,
    outline 0.2s ease,
    color 0.1s ease;

  border-radius: 16px;
  background-color: transparent;

  &:hover {
    background-color: ${colors.greyscale1};
  }
`;

const VoteButton = styled.img`
  width: 40px;
  height: 44px;
  cursor: pointer;
`;

const VoteText = styled(Txt)`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const VsText = styled(Txt)`
  margin: 0 20px;
`;
