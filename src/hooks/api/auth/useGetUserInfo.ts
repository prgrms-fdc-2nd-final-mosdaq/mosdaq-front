import { fetchGetUserInfo } from '@/apis/auth.api';
import { IUserProfile } from '@/models/user.model';
import useAuthStore from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

const useGetUserProfile = () => {
  const { isLoggedIn } = useAuthStore();
  const { data } = useQuery<IUserProfile>({
    queryKey: ['user', 'profile'],
    queryFn: fetchGetUserInfo,
    enabled: isLoggedIn,
    staleTime: 1000 * 6 * 5,
    gcTime: 1000 * 6 * 5,
  });

  return { userProfile: data };
};

export default useGetUserProfile;
