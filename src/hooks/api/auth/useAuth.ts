import { useMutation } from '@tanstack/react-query';
import { Token } from '../../../models/auth.model';
import { fetchPostGoogleOAuthLogin } from '../../../apis/auth.api';
import { setItem } from '../../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';
import { useGoogleLogin } from '@react-oauth/google';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthStore();

  const mutation = useMutation<Token, Error, string>({
    mutationFn: async (token: string) => {
      return fetchPostGoogleOAuthLogin(token);
    },
    onSuccess: (response: Token) => {
      const { accessToken, refreshToken } = response;
      setItem('accessToken', accessToken);
      setItem('refreshToken', refreshToken);
      setIsLoggedIn(true);
      navigate('/');
    },
    onError: (error) => {
      console.log('로그인 실패:', error);
    },
  });

  const handleGoogleLoginSuccess = async (response: any) => {
    const credential = response.code;

    if (credential) {
      mutation.mutate(credential);
    } else {
      console.error('Credential is missing');
    }
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginError,
    flow: 'auth-code',
  });

  return { googleLogin, mutation };
};
