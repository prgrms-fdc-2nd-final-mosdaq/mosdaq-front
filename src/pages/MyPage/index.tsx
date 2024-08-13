import MyMovieList from '@/components/myPage/MyMovieList';
import Profile from '@/components/myPage/Profile';
import React from 'react';
import styled from 'styled-components';

export default function MyPage() {
  return (
    <StyledMyPage>
      <Profile />
      <MyMovieList />
    </StyledMyPage>
  );
}

const StyledMyPage = styled.main`
  display: flex;
  gap: 80px;
  max-width: 1920px;
  width: 100%;
  padding: 60px 80px;
`;
