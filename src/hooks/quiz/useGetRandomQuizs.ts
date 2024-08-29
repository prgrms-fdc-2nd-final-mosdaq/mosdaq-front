import { useEffect, useState } from 'react';
import { useGetMovieQuiz } from '../api/quiz/useGetMovieQuiz';
import { IQuizInfo } from '@/models/quiz.model';
import { getRandomQuizs } from '@/utils/quiz/getRandomQuizs';

export const useGetRandomQuizs = () => {
  const { movieQuizData, isLoading } = useGetMovieQuiz();
  const [movieQuizs, setMovieQuizs] = useState<IQuizInfo[] | undefined>();

  useEffect(() => {
    if (movieQuizData) {
      setMovieQuizs(getRandomQuizs(movieQuizData));
    }
    // console.log(movieQuizs);
  }, [movieQuizData]);

  return {
    movieQuizs,
    isLoading,
  };
};
