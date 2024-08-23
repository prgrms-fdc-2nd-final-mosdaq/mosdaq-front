import { fetchGetUserInfo } from '@/apis/auth.api';
import { useQuery } from '@tanstack/react-query';

const useGetUserInfo = () => {
  const { data } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: fetchGetUserInfo,
  });

  return { data };
};

export default useGetUserInfo;
