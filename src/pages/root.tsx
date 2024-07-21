import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <ContentContainerStyle>
        <Outlet />
      </ContentContainerStyle>
    </>
  );
}
const ContentContainerStyle = styled.div``;
