import React, { useEffect, useState } from 'react';
import { useGetRandomQuizs } from '@/hooks/quiz/useGetRandomQuizs';
import styled from 'styled-components';

import QuizItem from './QuizItem';
import ResultItem from './ResultItem';

interface IQuizDoingProps {
  setCorrectCount: React.Dispatch<React.SetStateAction<number>>;
  setQuizStatus: React.Dispatch<
    React.SetStateAction<'waiting' | 'doing' | 'ended'>
  >;
}

export default function QuizDoing({
  setCorrectCount,
  setQuizStatus,
}: IQuizDoingProps) {
  const { movieQuizs } = useGetRandomQuizs();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isResult, setIsResult] = useState(false);

  useEffect(() => {
    setCorrectCount(0);
  }, []);

  return (
    <StyledQuizDoing>
      {currentQuizIndex < 10 && isResult === false && movieQuizs && (
        <QuizItem
          setCorrectCount={setCorrectCount}
          setIsResult={setIsResult}
          setIsCorrect={setIsCorrect}
          movieQuiz={movieQuizs[currentQuizIndex]}
          currentQuizIndex={currentQuizIndex}
        />
      )}
      {currentQuizIndex < 10 && isResult === true && movieQuizs && (
        <ResultItem
          currentQuizIndex={currentQuizIndex}
          setQuizStatus={setQuizStatus}
          movieQuiz={movieQuizs[currentQuizIndex]}
          isCorrect={isCorrect}
          setCurrentQuizIndex={setCurrentQuizIndex}
          setIsResult={setIsResult}
        />
      )}
    </StyledQuizDoing>
  );
}

const StyledQuizDoing = styled.div`
  width: 100%;
  height: 100%;
`;
