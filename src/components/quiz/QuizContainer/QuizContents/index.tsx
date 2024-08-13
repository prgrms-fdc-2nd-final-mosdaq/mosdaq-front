import React from 'react';
import styled from 'styled-components';
import QuizLanding from './QuizLanding';

export default function QuizContents() {
  return (
    <StyledQuizContents>
      <QuizLanding />
    </StyledQuizContents>
  );
}

const StyledQuizContents = styled.div`
  width: 100%;
  height: 100%;
`;
