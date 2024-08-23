import { Button } from '@/components/common/Button';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import confetti from 'canvas-confetti';

interface IQuizEndedProps {
  correctCount: number;
  setQuizStatus: React.Dispatch<
    React.SetStateAction<'waiting' | 'doing' | 'ended'>
  >;
}

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

export default function QuizEnded({
  correctCount,
  setQuizStatus,
}: IQuizEndedProps) {
  const getResultMessage = () => {
    if (correctCount === 10) {
      return `${correctCount}문제 맞추셨습니다. 완벽합니다!`;
    } else if (correctCount >= 7) {
      return `${correctCount}문제 맞추셨습니다. 많은 문제를 맞추셨네요!`;
    } else if (correctCount >= 4) {
      return `${correctCount}문제 맞추셨습니다. 나쁘지 않군요~`;
    } else if (correctCount > 0) {
      return `${correctCount}문제 맞추셨습니다. 더 잘할 수 있을 거에요!`;
    } else {
      return `${correctCount}문제 맞추셨습니다. 다시 도전해보세요!`;
    }
  };

  useEffect(() => {
    if (correctCount >= 4) {
      triggerConfetti();
    }
  }, [correctCount]);

  return (
    <StyledQuizEnded>
      <StyledLandingDescription>
        <Txt typography="Pretendard40bold">{getResultMessage()}</Txt>
      </StyledLandingDescription>
      <StyledButton
        onClick={() => {
          setQuizStatus('doing');
        }}
      >
        <Txt color="white" typography="Pretendard32regular">
          다시 풀기
        </Txt>
      </StyledButton>
    </StyledQuizEnded>
  );
}
const StyledQuizEnded = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.watcha};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledLandingDescription = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 40px;
  padding: 50px;
`;
const StyledButton = styled(Button)`
  position: absolute;
  bottom: 100px;
  background-color: inherit;
  border: 2px solid ${colors.white};
  border-radius: 20px;

  &:hover {
    background-color: ${colors.watcha2};
  }
`;
