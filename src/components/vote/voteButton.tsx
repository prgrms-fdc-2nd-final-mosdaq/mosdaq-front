import styled from 'styled-components';
import upIcon from '../../assets/images/main/mainUpBtn.png';
import downIcon from '../../assets/images/main/mainDownBtn.png';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';
import greyUpIcon from '@/assets/images/movieDetail/greyUpIcon.png';
import greyDownIcon from '@/assets/images/movieDetail/greyDownIcon.png';
import { usePollMovie } from '@/hooks/api/poll/usePollMovie';

interface VoteButtonProps {
  movieId: string;
  upRatio: number | undefined;
  downRatio: number | undefined;
  initialVote: 'up' | 'down' | null;
}

interface VoteItemProps {
  isSelected: boolean;
  isDisabled: boolean;
  isVoteSelected: boolean;
}

export default function VoteButton({
  movieId,
  upRatio,
  downRatio,
  initialVote,
}: VoteButtonProps) {
  const isUpSelected = initialVote === 'up';
  const isDownSelected = initialVote === 'down';
  const isVoteSelected = initialVote !== null;
  console.log(movieId);
  const { pollMovie } = usePollMovie(movieId);

  return (
    <ButtonContainer>
      <VoteLeftZone
        onClick={() => pollMovie('up')}
        isSelected={isUpSelected}
        isDisabled={isDownSelected}
        isVoteSelected={isVoteSelected}
      >
        <VoteIcon
          src={isVoteSelected ? (isUpSelected ? upIcon : greyUpIcon) : upIcon}
          alt="오른다"
        />
        <TextContainer alignLeft={true}>
          <Txt
            typography="Pretendard32bold"
            color={
              isVoteSelected
                ? isUpSelected
                  ? 'watcha'
                  : 'greyscale6'
                : 'watcha'
            }
            style={{ fontSize: isVoteSelected ? '28px' : '32px' }}
          >
            오른다
          </Txt>
          {isVoteSelected && upRatio !== undefined && (
            <Txt
              typography="Pretendard32bold"
              color={isUpSelected ? 'watcha' : 'greyscale6'}
            >
              {upRatio}%
            </Txt>
          )}
        </TextContainer>
      </VoteLeftZone>
      <VSContainer isDisabled={isVoteSelected}>
        <VoteText
          typography="Pretendard32bold"
          color={isVoteSelected ? 'greyscale6' : 'watcha'}
        >
          vs
        </VoteText>
      </VSContainer>
      <VoteRightZone
        onClick={() => pollMovie('down')}
        isSelected={isDownSelected}
        isDisabled={isUpSelected}
        isVoteSelected={isVoteSelected}
      >
        <TextContainer alignLeft={false}>
          <Txt
            typography="Pretendard32bold"
            color={
              isVoteSelected
                ? isDownSelected
                  ? 'watcha'
                  : 'greyscale6'
                : 'watcha'
            }
            style={{ fontSize: isVoteSelected ? '28px' : '32px' }}
          >
            내린다
          </Txt>
          {isVoteSelected && downRatio !== undefined && (
            <Txt
              typography="Pretendard32bold"
              color={isDownSelected ? 'watcha' : 'greyscale6'}
            >
              {downRatio}%
            </Txt>
          )}
        </TextContainer>
        <VoteIcon
          src={
            isVoteSelected
              ? isDownSelected
                ? downIcon
                : greyDownIcon
              : downIcon
          }
          alt="내린다"
        />
      </VoteRightZone>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 750px;
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
  cursor: pointer;
  transition: color 0.1s ease;
  border: ${({ isSelected }) =>
    isSelected ? `2px solid ${colors.watcha}` : '2px solid transparent'};
  background-color: ${({ isDisabled }) =>
    isDisabled ? `${colors.greyscale2}` : 'transparent'};
`;

const VoteLeftZone = styled(VoteItem)`
  border-radius: 20px 0 0 20px;
`;

const VoteRightZone = styled(VoteItem)`
  border-radius: 0 20px 20px 0;
`;

const VoteIcon = styled.img`
  width: 69px;
  height: 76px;
  margin-right: 8px;
  padding 10px;
`;

const VoteText = styled(Txt)`
  margin: 0 15px;
`;

const VSContainer = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 100%;
  border-left: 1px solid ${colors.greyscale8};
  border-right: 1px solid ${colors.greyscale8};
  background-color: ${({ isDisabled }) =>
    isDisabled ? `${colors.greyscale2}` : 'transparent'};
`;

const TextContainer = styled.div<{ alignLeft: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignLeft }) => (alignLeft ? 'flex-start' : 'flex-end')};
  margin-left: ${({ alignLeft }) => (alignLeft ? '10px' : '0')};
  margin-right: ${({ alignLeft }) => (alignLeft ? '0' : '10px')};
`;
