import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/home/Banner';
import Upcoming from '../../components/home/Upcoming';
import NowPlaying from '../../components/home/NowPlaying';

export default function HomePage() {
  return (
    <StyledHomePage>
      <Banner />
      <Upcoming />
      <NowPlaying />
    </StyledHomePage>
  );
}

const StyledHomePage = styled.main``;
