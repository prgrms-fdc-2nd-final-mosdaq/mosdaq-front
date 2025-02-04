import styled from 'styled-components';
import { useGoogleOAuth } from '../../hooks/api/auth/useGoogleOAuth';
import colors from '@/constants/colors';
import googleLogo from '@/assets/images/login/login-google.svg';

export default function CustomGoogleLoginButton() {
  const { googleLogin } = useGoogleOAuth();

  return (
    <StyledButton type="button" onClick={() => googleLogin()}>
      <span>Google 계정으로 로그인</span>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 578px;
  height: 44px;
  background-color: ${colors.white};
  border: 1px solid ${colors.greyscale3};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.2s ease,
    outline 0.2s ease,
    color 0.1s ease;

  &:hover {
    background-color: ${colors.greyscale1};
  }

  span {
    font-family: 'noto Sans';
    position: relative;
    line-height: 140%;
    font-size: 16px;

    &:before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      background-image: url(${googleLogo});
      background-size: cover;
      position: absolute;
      left: -30px;
      top: 50%;
      transform: translateY(-60%);
    }
  }
`;
