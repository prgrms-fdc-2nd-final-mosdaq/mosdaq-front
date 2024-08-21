import React, { useState } from 'react';
import styled from 'styled-components';
import QuizWaiting from './QuizWaiting';
import QuizDoing from './QuizDoing';
import QuizEnded from './QuizEnded';

export default function QuizContents() {
  const [quizStatus, setQuizStatus] = useState<'waiting' | 'doing' | 'ended'>(
    'waiting',
  );
  const [correctCount, setCorrectCount] = useState(0);

  return (
    <StyledQuizContents>
      {quizStatus === 'waiting' && (
        <QuizWaiting setQuizStatus={setQuizStatus} />
      )}
      {quizStatus === 'doing' && (
        <QuizDoing
          setCorrectCount={setCorrectCount}
          setQuizStatus={setQuizStatus}
        />
      )}
      {quizStatus === 'ended' && (
        <QuizEnded setQuizStatus={setQuizStatus} correctCount={correctCount} />
      )}
    </StyledQuizContents>
  );
}

const StyledQuizContents = styled.div`
  width: 100%;
  height: 100%;
`;
