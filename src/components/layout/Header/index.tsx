import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Button } from '../../common/Button';
import mainLogo from '../../../assets/images/mainLogo.png';
import mypageLogo from '../../../assets/images/mypageLogo.png';

const BaseButton = styled(Button).attrs(() => ({
  variant: 'secondary',
  size: 'small',
}))`
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 700;
`;

const NavButton = styled(BaseButton)`
  background-color: ${colors.white};
  }
`;

const LoginButton = styled(BaseButton)`
  background-color: ${colors.watcha};
  color: ${colors.white};
  border-radius: 7px;

  &:hover {
    background-color: ${colors.greyscale8};
  }
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <LeftSection>
        <Link to="/">
          <MainLogo src={mainLogo} alt="Main Logo" />
        </Link>
        <Nav>
          <NavButton as={Link} to="/movie-list">
            영화 투표
          </NavButton>
          <NavButton as={Link} to="/quiz">
            영화 퀴즈
          </NavButton>
        </Nav>
      </LeftSection>
      <RightSection>
        <LoginButton as={Link} to="/login">
          로그인
        </LoginButton>
        <Link to="/mypage">
          <MypageLogo src={mypageLogo} alt="MyPage Logo" />
        </Link>
      </RightSection>
    </HeaderContent>
  </HeaderContainer>
);

const HeaderContainer = styled.section`
  width: 100%;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.greyscale8};

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const HeaderContent = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 50px;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
`;

const MainLogo = styled.img`
  width: 130px;
`;

const MypageLogo = styled.img`
  width: 40x;
`;

export default Header;
