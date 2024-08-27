import React from 'react';
// import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';

interface IRootLayoutProps {
  preloadQuizPage: () => void;
  preloadMyPage: () => void;
  preloadLoginPage: () => void;
  preloadHomePage: () => void;
}

export default function RootLayout(props: IRootLayoutProps) {
  return (
    <>
      <Header {...props} />
      {/* <StyledContentContainer> */}
      <Outlet />
      {/* </StyledContentContainer> */}
    </>
  );
}

/* const StyledContentContainer = styled.div`
  max-width: 1200px;
  min-width: 480px;
  width: 100%;

  border: 1px solid black;
`;
 */
