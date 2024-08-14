import { Button } from '@/components/common/Button';
import { Txt } from '@/components/common/Txt';
import colors from '@/constants/colors';
import useMovieTitleRotator from '@/hooks/quiz/useMovieTitleRotator';
import React from 'react';
import styled from 'styled-components';

const movieTitles = [
  '스파이더맨',
  '올드 보이',
  '다크 나이트',
  '인셉션',
  '아바타',
];

interface IQuizLandingProps {
  setQuizStatus: React.Dispatch<
    React.SetStateAction<'waiting' | 'doing' | 'ended'>
  >;
}

export default function QuizWaiting({ setQuizStatus }: IQuizLandingProps) {
  // TODO: 배경화면도 전환되도록 할까 고민
  const { currentTitleIndex, fade } = useMovieTitleRotator(movieTitles);

  return (
    <StyledQuizWaiting>
      <StyledLandingDescription>
        <StyledMovieTitle fade={fade}>
          <Txt typography="Pretendard40bold">
            {movieTitles[currentTitleIndex]}
          </Txt>
        </StyledMovieTitle>
        <Txt typography="Pretendard40bold">
          개봉 후 관련 주가는 어떻게 변했을까요?
        </Txt>
      </StyledLandingDescription>

      <StyledButton
        onClick={() => {
          setQuizStatus('doing');
        }}
      >
        <Txt color="white" typography="Pretendard32regular">
          퀴즈 풀기
        </Txt>
      </StyledButton>
    </StyledQuizWaiting>
  );
}

const StyledQuizWaiting = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.watcha};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLandingDescription = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: 40px;
  padding: 50px;
`;

interface IStyledMovieTitleProps {
  fade: boolean;
}

const StyledMovieTitle = styled.span<IStyledMovieTitleProps>`
  opacity: ${(props) => (props.fade ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 100px;
  background-color: inherit;
  border: 2px solid ${colors.white};
  border-radius: 20px;

  &:hover {
    background-color: ${colors.watcha2};
  }
`;
