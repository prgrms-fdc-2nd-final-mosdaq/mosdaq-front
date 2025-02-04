import styled from 'styled-components';
import upIcon from '../../assets/images/main/mainUpBtn.png';
import downIcon from '../../assets/images/main/mainDownBtn.png';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';
import greyUpIcon from '@/assets/images/movieDetail/greyUpIcon.png';
import greyDownIcon from '@/assets/images/movieDetail/greyDownIcon.png';
import { usePollMovie } from '@/hooks/api/poll/usePollMovie';
import { IPollBox } from '@/models/poll.model';
import { calculatePercentages } from '@/utils/math';
import { VoteIconLeft, VoteIconRight } from './VoteButtonAfterMovieOpen';

interface VoteButtonProps {
  movieId: string;
  pollBox: IPollBox;
  isPollActive?: boolean;
  // 개봉 이후 4주가 지나지 않은 영화 상세페이지에서 투표 기능을 막기 위함
}

interface VoteItemProps {
  $isSelected: boolean;
  $isDisabled: boolean;
  $isVoteSelected: boolean;
  $isPollActive: boolean;
}

export default function VoteButton({
  movieId,
  pollBox,
  isPollActive = true,
}: VoteButtonProps) {
  const isUpSelected: boolean = pollBox.pollResult === 'up';
  const isDownSelected: boolean = pollBox.pollResult === 'down';
  const isVoteSelected: boolean = !!pollBox.pollResult;

  const { pollMovie, SnackbarComponent } = usePollMovie(movieId);
  const { upPercentage, downPercentage } = calculatePercentages(
    pollBox.up,
    pollBox.down,
  );

  return (
    <ButtonContainer>
      <VoteLeftZone
        onClick={() => {
          if (isPollActive) pollMovie('up');
        }}
        $isSelected={isUpSelected}
        $isDisabled={isDownSelected}
        $isVoteSelected={isVoteSelected}
        $isPollActive={isPollActive}
      >
        <div className="container">
          <VoteIconLeft
            src={isVoteSelected ? (isUpSelected ? upIcon : greyUpIcon) : upIcon}
            alt="오른다"
          />
          <TextContainer>
            <Txt
              typography="Pretendard32bold"
              color={
                isVoteSelected
                  ? isUpSelected
                    ? 'watcha'
                    : 'greyscale6'
                  : 'watcha'
              }
              style={{ fontSize: isVoteSelected ? '24px' : '32px' }}
            >
              오른다
            </Txt>
            {pollBox.pollResult && (
              <Txt
                typography="Pretendard32bold"
                color={isUpSelected ? 'watcha' : 'greyscale6'}
                style={{ fontSize: isVoteSelected ? '24px' : '32px' }}
              >
                {upPercentage}%
              </Txt>
            )}
          </TextContainer>
        </div>
      </VoteLeftZone>
      <VSContainer $isDisabled={isVoteSelected}>
        <VoteText
          typography="Pretendard32bold"
          color={isVoteSelected ? 'greyscale6' : 'watcha'}
        >
          vs
        </VoteText>
      </VSContainer>
      <VoteRightZone
        onClick={() => {
          if (isPollActive) pollMovie('down');
        }}
        $isSelected={isDownSelected}
        $isDisabled={isUpSelected}
        $isVoteSelected={isVoteSelected}
        $isPollActive={isPollActive}
      >
        <div className="container">
          <TextContainer>
            <Txt
              typography="Pretendard32bold"
              color={
                isVoteSelected
                  ? isDownSelected
                    ? 'watcha'
                    : 'greyscale6'
                  : 'watcha'
              }
              style={{ fontSize: isVoteSelected ? '24px' : '32px' }}
            >
              내린다
            </Txt>
            {pollBox.pollResult && (
              <Txt
                typography="Pretendard32bold"
                color={isDownSelected ? 'watcha' : 'greyscale6'}
                style={{ fontSize: isVoteSelected ? '24px' : '32px' }}
              >
                {downPercentage}%
              </Txt>
            )}
          </TextContainer>
          <VoteIconRight
            src={
              isVoteSelected
                ? isDownSelected
                  ? downIcon
                  : greyDownIcon
                : downIcon
            }
            alt="내린다"
          />
        </div>
      </VoteRightZone>
      {SnackbarComponent}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 140px;
  border: 1px solid ${colors.greyscale8};
  border-radius: 20px;
`;

const VoteItem = styled.div<VoteItemProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: ${({ $isPollActive }) => ($isPollActive ? `pointer` : 'default')};
  transition:
    background 0.2s ease,
    outline 0.2s ease,
    color 0.1s ease;
  border: ${({ $isSelected }) =>
    $isSelected ? `3px solid ${colors.watcha}` : '2px solid transparent'};
  background-color: ${({ $isDisabled }) =>
    $isDisabled ? `${colors.greyscale2}` : 'transparent'};

  &:hover {
    background-color: ${colors.greyscale1};
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      line-height: 1;
    }
  }
`;

const VoteLeftZone = styled(VoteItem)`
  border-radius: 20px 0 0 20px;
`;

const VoteRightZone = styled(VoteItem)`
  border-radius: 0 20px 20px 0;
  max-height: 140px;
`;

const VoteText = styled(Txt)`
  margin: 0 15px;
`;

const VSContainer = styled.div<{ $isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 100%;
  border-left: 1px solid ${colors.greyscale8};
  border-right: 1px solid ${colors.greyscale8};
  background-color: ${({ $isDisabled }) =>
    $isDisabled ? `${colors.greyscale2}` : 'transparent'};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
