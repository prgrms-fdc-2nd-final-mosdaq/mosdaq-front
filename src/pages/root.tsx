import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <StyledContentContainer>
        <Outlet />
      </StyledContentContainer>
    </>
  );
}
const StyledContentContainer = styled.div`
  // 페이지별로 화면 영역이 달라서 일단 주석처리 했습니다.
  /* max-width: 960px; */
  /* min-width: 480px; */
  width: 100%;
  /* border: 1px solid black; */
`;
