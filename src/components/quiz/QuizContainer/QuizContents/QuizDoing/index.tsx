import { useGetMovieQuiz } from '@/hooks/api/quiz/useGetMovieQuiz';
import React from 'react';
import styled from 'styled-components';

export default function QuizDoing() {
  const { movieQuiz } = useGetMovieQuiz();

  return <StyledQuizDoing>QuizDoing</StyledQuizDoing>;
}

const StyledQuizDoing = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
