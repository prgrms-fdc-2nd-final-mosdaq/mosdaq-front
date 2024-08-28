import styled from 'styled-components';
import upIcon from '../../assets/images/main/mainUpBtn.png';
import downIcon from '../../assets/images/main/mainDownBtn.png';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';

interface VoteButtonProps {
  onUpVote: () => void;
  onDownVote: () => void;
}

export default function VoteButton({ onUpVote, onDownVote }: VoteButtonProps) {
  return (
    <ButtonContainer>
      <VoteLeftZone onClick={onUpVote}>
        <VoteIcon src={upIcon} alt="오른다" />
        <Txt typography="Pretendard32bold" color="watcha">
          오른다
        </Txt>
      </VoteLeftZone>
      <div className="vs">
        <VoteText typography="Pretendard32bold" color="watcha">
          vs
        </VoteText>
      </div>
      <VoteRightZone onClick={onDownVote}>
        <Txt typography="Pretendard32bold" color="watcha">
          내린다
        </Txt>
        <VoteIcon src={downIcon} alt="내린다" />
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

const VoteItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.1s ease;

  &:hover {
    background-color: ${colors.greyscale1};
  }
`;

const VoteLeftZone = styled(VoteItem)`
  border-radius: 20px 0 0 20px;
`;

const VoteRightZone = styled(VoteItem)`
  border-radius: 0 20px 20px 0;
`;

const VoteIcon = styled.img`
  width: 52px;
  height: 57px;
  margin-right: 8px;
  padding 10px;
`;

const VoteText = styled(Txt)`
  margin: 0 15px;
`;
