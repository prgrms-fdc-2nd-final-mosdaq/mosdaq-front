import styled from 'styled-components';
import colors from '@/constants/colors';
import { calculatePercentages } from '@/utils/math';
import blackDownIcon from '@/assets/images/movieDetail/down_black.svg';
import blackUpIcon from '@/assets/images/movieDetail/up_black.svg';
import upIcon from '../../assets/images/main/mainUpBtn.png';
import downIcon from '../../assets/images/main/mainDownBtn.png';

interface VoteButtonProps {
  up: number;
  down: number;
  myPollResult: 'up' | 'down' | null;
  pollAnswer: 'up' | 'down';
  isNotYet4WeeksLater: boolean;
}

export default function VoteButtonAfterMovieOpen({
  up,
  down,
  myPollResult,
  pollAnswer,
}: VoteButtonProps) {
  const { upPercentage, downPercentage } = calculatePercentages(
    up || 0,
    down || 0,
  );

  return (
    <ButtonContainer>
      <VoteLeftZone
        $width={upPercentage}
        $myPollResult={myPollResult}
        $pollAnswer={pollAnswer}
      >
        <div className="container">
          <VoteIconLeft
            src={
              pollAnswer === myPollResult && myPollResult === 'up'
                ? upIcon
                : !myPollResult
                  ? upIcon
                  : blackUpIcon
            }
            alt="오른다"
          />
          <VoteStatusLeft $myPollResult={!!myPollResult}>
            오른다
            <br />
            {upPercentage}%
          </VoteStatusLeft>
        </div>
      </VoteLeftZone>

      <VoteRightZone
        $width={downPercentage}
        $myPollResult={myPollResult}
        $pollAnswer={pollAnswer}
      >
        <div className="container">
          <VoteStatusRight $myPollResult={!!myPollResult}>
            내린다
            <br />
            {downPercentage}%
          </VoteStatusRight>

          <VoteIconRight
            src={
              pollAnswer === myPollResult && myPollResult === 'down'
                ? downIcon
                : !myPollResult
                  ? downIcon
                  : blackDownIcon
            }
            alt="내린다"
          />
        </div>
      </VoteRightZone>
    </ButtonContainer>
  );
}

type PollResultProps = {
  $width: number;
  $myPollResult?: 'up' | 'down' | null;
  $pollAnswer: 'up' | 'down';
};

type VoteStatusProps = {
  $myPollResult: boolean;
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 750px;
  width: 100%;
  height: 140px;
  border: 1px solid ${colors.greyscale8};
  border-radius: 20px;

  .vs {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 100%;
    border-left: 1px solid ${colors.greyscale8};
    border-right: 1px solid ${colors.greyscale8};
  }
`;

const VoteItem = styled.div<PollResultProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${({ $myPollResult }) =>
    $myPollResult ? colors.greyscale1 : colors.white};

  .container {
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const VoteLeftZone = styled(VoteItem)<PollResultProps>`
  flex: ${({ $width }) => $width}%;
  border-radius: 20px 0 0 20px;
  border-right: 1px solid ${colors.greyscale8};

  background-color: ${({ $myPollResult, $pollAnswer }) => {
    if (!$myPollResult) {
      return colors.white;
    }
    if ($pollAnswer === 'up') {
      return $myPollResult === 'up' ? colors.watcha : colors.greyscale1;
    } else {
      return $myPollResult === 'up' ? colors.greyscale7 : colors.greyscale1;
    }
  }};

  color: ${({ $myPollResult, $pollAnswer }) => {
    if (!$myPollResult) {
      return colors.watcha;
    }
    if ($pollAnswer === 'up') {
      return $myPollResult === 'up' ? colors.white : colors.greyscale6;
    } else {
      return $myPollResult === 'up' ? colors.greyscale1 : colors.greyscale6;
    }
  }};
`;

const VoteRightZone = styled(VoteItem)<PollResultProps>`
  flex: ${({ $width }) => $width}%;
  border-radius: 0 20px 20px 0;

  background-color: ${({ $myPollResult, $pollAnswer }) => {
    if (!$myPollResult) {
      return colors.white;
    }
    if ($pollAnswer === 'down') {
      return $myPollResult === 'down' ? colors.watcha : colors.greyscale1;
    } else {
      return $myPollResult === 'down' ? colors.greyscale7 : colors.greyscale1;
    }
  }};

  color: ${({ $myPollResult, $pollAnswer }) => {
    if (!$myPollResult) {
      return colors.watcha;
    }
    if ($pollAnswer === 'down') {
      return $myPollResult === 'down' ? colors.white : colors.greyscale6;
    } else {
      return $myPollResult === 'down' ? colors.greyscale1 : colors.greyscale6;
    }
  }};
`;

export const VoteIcon = styled.img`
  width: 52px;
  height: 57px;
  padding 10px;
`;

export const VoteIconRight = styled(VoteIcon)`
  margin-left: 8px;
`;
export const VoteIconLeft = styled(VoteIcon)`
  margin-right: 8px;
`;

const VoteStatusRight = styled.span<VoteStatusProps>`
  font-size: 24px;
  line-height: 1;
  text-align: right;
  font-weight: 700;
`;

const VoteStatusLeft = styled.span<VoteStatusProps>`
  font-size: 24px;
  line-height: 1;
  text-align: left;
  font-weight: 700;
`;
