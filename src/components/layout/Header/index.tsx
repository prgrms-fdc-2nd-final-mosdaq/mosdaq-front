import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../constants/colors';

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/">Mosdaq</Link>
      <StyledNav>
        <Link to="/quiz">퀴즈</Link>
        {/* <Link to="/mypage">마이페이지</Link> */}
        <Link to="/login">로그인</Link>
      </StyledNav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${colors.grey300};
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 1rem;
`;
