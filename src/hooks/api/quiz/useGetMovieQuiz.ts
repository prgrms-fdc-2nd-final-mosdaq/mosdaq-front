import { useQuery } from '@tanstack/react-query';
import { fetchGetMovieQuiz } from '../../../apis/quiz.api';

export const useGetMovieQuiz = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['movieQuiz'],
    queryFn: fetchGetMovieQuiz,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  // // console.log(data);

  return {
    movieQuizData: data,
    isLoading,
    refetch,
  };
};
