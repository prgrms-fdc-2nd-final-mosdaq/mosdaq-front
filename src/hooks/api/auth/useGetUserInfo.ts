import { fetchGetUserInfo } from '@/apis/auth.api';
import useAuthStore from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IUserInfo } from '@/models/user.model';

const useGetUserProfile = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStore();
  const { setProfile } = useUserStore();
  const { data } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: fetchGetUserInfo,
    enabled: isLoggedIn,
  });

  const upDateUserPoint = (point: number) => {
    const queryKey = ['user', 'profile'];
    const userProfile: IUserInfo | undefined =
      queryClient.getQueryData(queryKey);
    if (userProfile) {
      const shallow: IUserInfo = { ...userProfile };
      shallow.point += point;
      queryClient.setQueryData(queryKey, shallow);
    }
  };

  return { userProfile: data, upDateUserPoint };
};

export default useGetUserProfile;
