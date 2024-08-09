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
  background-color: ${colors.background};
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    // hover 스타일 추가 필요
    background-color: grey;
  }

  span {
    font-family: 'noto Sans';
    position: relative;
    line-height: 140%;
    font-size: 16px;
    color: #232323;

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
