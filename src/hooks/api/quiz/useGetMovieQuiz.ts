import { useQuery } from '@tanstack/react-query';
import { fetchGetMovieQuiz } from '../../../apis/quiz.api';

export const useGetMovieQuiz = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['movieQuiz'],
    queryFn: fetchGetMovieQuiz,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  console.log(data);

  return {
    movieQuiz: data,
    isLoading,
    refetch,
  };
};
