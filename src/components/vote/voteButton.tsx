import { useState } from 'react';
import styled from 'styled-components';
import upIcon from '../../assets/images/main/mainUpBtn.png';
import downIcon from '../../assets/images/main/mainDownBtn.png';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';

interface VoteButtonProps {
  onUpVote: () => void;
  onDownVote: () => void;
}

interface VoteItemProps {
  isSelected: boolean;
  isDisabled: boolean;
}

export default function VoteButton({ onUpVote, onDownVote }: VoteButtonProps) {
  const [selectedVote, setSelectedVote] = useState<'up' | 'down' | null>(null);

  const handleUpVote = () => {
    setSelectedVote('up');
    onUpVote();
  };

  const handleDownVote = () => {
    setSelectedVote('down');
    onDownVote();
  };

  return (
    <ButtonContainer>
      <VoteLeftZone
        onClick={handleUpVote}
        isSelected={selectedVote === 'up'}
        isDisabled={selectedVote === 'down'}
      >
        <VoteIcon src={upIcon} alt="오른다" />
        <Txt typography="Pretendard32bold" color="watcha">
          오른다
        </Txt>
      </VoteLeftZone>
      <VSContainer isDisabled={selectedVote !== null}>
        <VoteText typography="Pretendard32bold" color="watcha">
          vs
        </VoteText>
      </VSContainer>
      <VoteRightZone
        onClick={handleDownVote}
        isSelected={selectedVote === 'down'}
        isDisabled={selectedVote === 'up'}
      >
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
  width: 52px;
  height: 57px;
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
