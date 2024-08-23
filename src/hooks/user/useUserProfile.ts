import { useQueryClient } from '@tanstack/react-query';
import { IUserProfile } from '@/models/user.model';

const useUserProfile = () => {
  const queryClient = useQueryClient();
  /*
  point optimstic update에 사용하시면 됩니다.
  단, 투표 수정일 경우에 포인트 중복 적립 방지 처리는 직접 하셔야합니다.
*/
  const upDateUserPoint = (point: number) => {
    const queryKey = ['user', 'profile'];
    const userProfile: IUserProfile | undefined =
      queryClient.getQueryData(queryKey);
    if (userProfile) {
      const shallow: IUserProfile = { ...userProfile };
      shallow.point += point;
      queryClient.setQueryData(queryKey, shallow);
    }
  };

  return { upDateUserPoint };
};

export default useUserProfile;
