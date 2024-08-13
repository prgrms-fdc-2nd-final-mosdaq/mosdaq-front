import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Txt } from '../../common/Txt';
import { Button } from '../../common/Button';
import mainLogo from '../../../assets/images/main/mainLogo.png';
import mypageLogo from '../../../assets/images/main/mypageLogo.png';
import useAuthStore from '@/store/authStore';
import LogoutButton from '@/components/layout/Header/LogoutButton';

export default function Header() {
  const { isLoggedIn } = useAuthStore();
  return (
    <StyledHeaderContainer>
      <StyledHeaderContent>
        <StyledLeftSection>
          <Link to="/">
            <StyledMainLogo src={mainLogo} alt="Main Logo" />
          </Link>
          <StyledNav>
            <Button size="small">
              <Txt>
                <Link to="/movie-list">영화 투표</Link>
              </Txt>
            </Button>
            <Button size="small">
              <Txt>
                <Link to="/quiz">영화 퀴즈</Link>
              </Txt>
            </Button>
          </StyledNav>
        </StyledLeftSection>
        <StyledRightSection>
          {isLoggedIn ? (
            // TODO: 로그아웃 버튼은 마이페이지에 두면 어떨까요?
            <LogoutButton />
          ) : (
            <Button size="small" variant="secondary">
              <Txt color="white">
                <Link to="/login">로그인</Link>
              </Txt>
            </Button>
          )}
          <Link to="/mypage">
            <StyledMypageLogo src={mypageLogo} alt="MyPage Logo" />
          </Link>
        </StyledRightSection>
      </StyledHeaderContent>
    </StyledHeaderContainer>
  );
}

const StyledHeaderContainer = styled.section`
  width: 100%;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.greyscale2};
  position: relative;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const StyledHeaderContent = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 68px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const StyledRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
`;

const StyledMainLogo = styled.img`
  width: 150px;
`;

const StyledMypageLogo = styled.img`
  width: 40x;
`;
