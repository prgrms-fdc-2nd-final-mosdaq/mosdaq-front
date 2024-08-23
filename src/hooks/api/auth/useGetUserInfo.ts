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
  });

  return { userProfile: data };
};

export default useGetUserProfile;
