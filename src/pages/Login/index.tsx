import styled from 'styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { useEffect } from 'react';
import CustomGoogleLoginButton from '../../components/login/CustomGoogleLoginButton';
import loginTriangle from '@/assets/images/login/login-triangle.svg';
import loginMovieStock from '@/assets/images/login/login-movieStock.svg';
import loginDescription from '@/assets/images/login/login-description.svg';
import loginWarning from '@/assets/images/login/login-warning.svg';
import Header from '@/components/layout/Header';
import colors from '@/constants/colors';
import loginBg from '/login-bg.svg';

export default function LoginPage() {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      <StyledLoginPage>
        <div className="login-wrap">
          <div className="login-left">
            <img
              className="login-triangle"
              src={loginTriangle}
              alt="site description"
            />
            <img
              className="login-movieStock"
              src={loginMovieStock}
              alt="site description"
            />
            <img
              className="login-description"
              src={loginDescription}
              alt="site description"
            />
            <img
              className="login-warning"
              src={loginWarning}
              alt="site description"
            />
          </div>

          <div className="login-right">
            <h1>mosdaq</h1>
            <h2>SNS 계정으로 로그인하기</h2>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <CustomGoogleLoginButton />
            </GoogleOAuthProvider>
          </div>
        </div>
      </StyledLoginPage>
    </>
  );
}

const StyledLoginPage = styled.main`
  background-color: ${colors.greyscale1};
  height: calc(100dvh - 58.8px);
  width: 100dvw;
  display: flex;
  align-items: center;

  .login-wrap {
    background-color: white;
    width: 100%;
    height: 100%;
    max-width: 1655px;
    max-height: 861px;
    margin: 0 auto;
    border-radius: 32px;
    display: flex;

    .login-left {
      width: 100%;
      max-width: 690px;
      height: 100%;
      max-height: 861px;
      background-image: url(${loginBg});
      background-size: cover;
      border-radius: 32px 0 0 32px;
      position: relative;

      img {
        position: absolute;
      }

      .login-triangle {
        left: 92px;
        top: 253px;
      }

      .login-movieStock {
        left: 182px;
        top: 260px;
      }

      .login-description {
        left: 114px;
        top: 334px;
      }

      .login-warning {
        left: 114px;
        top: 494px;
      }
    }

    .login-right {
      width: 100%;
      height: 100%;
      border-radius: 0 32px 32px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        text-align: center;
        margin-top: 48px;
        margin-bottom: 100px;
        font-size: 64px;
        color: ${colors.watcha};
        font-weight: bold;
      }

      h2 {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: ${colors.greyscale11};
        margin-bottom: 20px;
      }
    }
  }
`;
