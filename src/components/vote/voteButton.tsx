import React from 'react';
import styled from 'styled-components';
import upIcon from '../../assets/images/main/mainUpBtn.png';
import downIcon from '../../assets/images/main/mainDownBtn.png';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';

interface VoteButtonProps {
  onUpVote: () => void;
  onDownVote: () => void;
}

export default function voteButton({ onUpVote, onDownVote }: VoteButtonProps) {
  return (
    <ButtonContainer>
      <VoteItem onClick={onUpVote}>
        <VoteIcon src={upIcon} alt="오른다" />
        <Txt typography="Pretendard32bold" color="watcha">
          오른다
        </Txt>
      </VoteItem>
      <Divider />
      <VoteText typography="Pretendard32bold" color="watcha">
        vs
      </VoteText>
      <Divider />
      <VoteItem onClick={onDownVote}>
        <Txt typography="Pretendard32bold" color="watcha">
          내린다
        </Txt>
        <VoteIcon src={downIcon} alt="내린다" />
      </VoteItem>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 750px;
  height: 140px;
  border: 1px solid ${colors.greyscale8};
  padding: 10px;
  border-radius: 20px;
`;

const VoteItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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

const Divider = styled.div`
  height: 140px; /* 라인의 높이를 아이템과 일치 */
  width: 1px;
  background-color: ${colors.greyscale8}; /* 회색 라인 */
  margin: 0 15px;
`;
