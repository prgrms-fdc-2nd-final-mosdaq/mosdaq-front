import { useMutation } from '@tanstack/react-query';
import { fetchPostLogout } from '@/apis/auth.api';
import { getItem } from '@/utils/localStorage';
import useAuthStore from '@/store/authStore';

export const useLogout = () => {
  const { logout } = useAuthStore();

  const mutation = useMutation({
    mutationFn: async () => {
      const refreshToken = getItem('refreshToken');
      return fetchPostLogout(refreshToken);
    },
    onSettled: () => {
      logout();
    },
  });

  return { mutation };
};
