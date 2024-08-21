import { useMutation } from '@tanstack/react-query';
import { fetchPostLogout } from '@/apis/auth.api';
import { getItem } from '@/utils/localStorage';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const refreshToken = getItem('refreshToken');
      return fetchPostLogout(refreshToken);
    },
    onSettled: () => {
      navigate('/');
      logout();
    },
  });

  return { mutation };
};
