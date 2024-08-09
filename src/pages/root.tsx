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
  max-width: 1200px;
  min-width: 480px;
  width: 100%;

  border: 1px solid black;
`;
