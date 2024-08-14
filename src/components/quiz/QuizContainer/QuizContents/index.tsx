import React, { useState } from 'react';
import styled from 'styled-components';
import QuizWaiting from './QuizWaiting';
import QuizDoing from './QuizDoing';

export default function QuizContents() {
  const [quizStatus, setQuizStatus] = useState<'waiting' | 'doing' | 'ended'>(
    'waiting',
  );

  return (
    <StyledQuizContents>
      {quizStatus === 'waiting' && (
        <QuizWaiting setQuizStatus={setQuizStatus} />
      )}
      {quizStatus === 'doing' && <QuizDoing />}
    </StyledQuizContents>
  );
}

const StyledQuizContents = styled.div`
  width: 100%;
  height: 100%;
`;
