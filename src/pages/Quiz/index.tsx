import QuizContainer from '@/components/quiz/QuizContainer';
import React from 'react';
import styled from 'styled-components';

export default function QuizPage() {
  return (
    <StyledQuizPage>
      <QuizContainer />
    </StyledQuizPage>
  );
}

const StyledQuizPage = styled.main`
  max-width: 1920px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
