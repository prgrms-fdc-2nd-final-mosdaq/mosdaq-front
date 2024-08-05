import styled from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/api/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { useEffect } from 'react';

export default function LoginPage() {
  const { handleGoogleLoginSuccess, handleGoogleLoginError } = useAuth();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  return (
    <StyledLoginPage>
      <img src="/google.svg"></img>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </StyledLoginPage>
  );
}

const StyledLoginPage = styled.main`
  background-color: red;
  height: 100%;
  max-height: 100%;
`;
