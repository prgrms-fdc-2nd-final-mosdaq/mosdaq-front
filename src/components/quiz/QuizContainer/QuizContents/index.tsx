import React from 'react';
import styled from 'styled-components';
import colors from '@/constants/colors';

export default function QuizContents() {
  return <StyledQuizContents></StyledQuizContents>;
}

const StyledQuizContents = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.watcha3};
`;
