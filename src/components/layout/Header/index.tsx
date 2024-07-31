import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Button } from '../../common/Button';

export default function Header() {
  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <Link to="/">Mosdaq</Link>
        <StyledNav>
          <Button variant="secondary" size="small">
            <Link to="/movie-list">영화 목록</Link>
          </Button>
          <Button variant="secondary" size="small">
            <Link to="/quiz">퀴즈</Link>
          </Button>
          {/* <Link to="/mypage">마이페이지</Link> */}
          <StyledLoginButton variant="secondary" size="small">
            <Link to="/login">로그인</Link>
          </StyledLoginButton>
        </StyledNav>
      </StyledHeader>
    </StyledHeaderContainer>
  );
}

const StyledHeaderContainer = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${colors.grey300};
`;

const StyledHeader = styled.header`
  max-width: 960px;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* padding: 1rem; */
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const StyledLoginButton = styled(Button)`
  background-color: crimson;
  font-weight: 700;
  color: ${colors.white};
  &:hover {
    background-color: red;
  }
`;
