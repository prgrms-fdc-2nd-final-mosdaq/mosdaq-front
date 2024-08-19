import React from 'react';
import styled from 'styled-components';
import colors from '@/constants/colors';
import { Txt } from '@/components/common/Txt';
import QuizContents from './QuizContents';

export default function QuizContainer() {
  return (
    <StyledQuizContainer>
      <StyledQuizTitle>
        <Txt typography="Pretendard36bold">
          개봉 후 제작(배급)사 주가가 어떻게 변했을까요?
          <Txt typography="Pretendard16regular" color="greyscale11">
            (개봉 4주 전, 개봉 4주 후 주가 변화)
          </Txt>
        </Txt>
      </StyledQuizTitle>
      <StyledMacBookBezel>
        <QuizContents />
      </StyledMacBookBezel>
      <StyledMacBookBoard>
        <StyledMacBookNotch />
      </StyledMacBookBoard>
    </StyledQuizContainer>
  );
}

const StyledQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const StyledQuizTitle = styled.div`
  align-self: flex-start;
  margin-left: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StyledMacBookBezel = styled.div`
  width: 1100px;
  height: 720px;
  border-radius: 20px 20px 0 0;
  border: 12px solid ${colors.black};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMacBookBoard = styled.div`
  position: relative;
  top: -4px;
  width: 1200px;
  height: 40px;
  background: linear-gradient(
    90deg,
    ${colors.greyscale5},
    ${colors.greyscale3},
    ${colors.greyscale8}
  );
  border-radius: 4px 4px 16px 16px;
  box-shadow:
    inset 0 1px 3px rgba(255, 255, 255, 0.6),
    0 1px 2px rgba(0, 0, 0, 0.15);
`;

const StyledMacBookNotch = styled.div`
  width: 240px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${colors.greyscale6},
    ${colors.greyscale4},
    ${colors.greyscale9}
  );
  border-radius: 0 0 12px 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
