import { Button } from '@/components/common/Button';
import { Txt } from '@/components/common/Txt';
import { IQuizInfo } from '@/models/quiz.model';
import React from 'react';
import styled from 'styled-components';

interface IResultItemProps {
  setIsResult: React.Dispatch<React.SetStateAction<boolean>>;
  setQuizStatus: React.Dispatch<
    React.SetStateAction<'waiting' | 'doing' | 'ended'>
  >;
  currentQuizIndex: number;
  isCorrect: boolean | null;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  movieQuiz: IQuizInfo;
}

export default function ResultItem({
  setIsResult,
  currentQuizIndex,
  setQuizStatus,
  isCorrect,
  setCurrentQuizIndex,
  movieQuiz,
}: IResultItemProps) {
  const handleClick = () => {
    if (currentQuizIndex === 9) {
      setQuizStatus('ended');
      return;
    }
    setCurrentQuizIndex((prev) => prev + 1);
    setIsResult(false);
  };

  console.log(movieQuiz.fourWeeksAfterPrice, movieQuiz.fourWeeksBeforePrice);
  // 퍼센트 변화를 계산합니다.
  const priceDifference = +(
    movieQuiz.fourWeeksAfterPrice - movieQuiz.fourWeeksBeforePrice
  ).toFixed(2);
  const percentChange = +(
    (priceDifference / movieQuiz.fourWeeksBeforePrice) *
    100
  ).toFixed(2);

  return (
    <StyledResultItem>
      <div className="image-container">
        <img src={movieQuiz.moviePoster[0]} alt={movieQuiz.movieTitle} />
      </div>
      <div>
        {isCorrect ? (
          <Txt color="watcha" typography="Pretendard36bold">
            정답이네요!
          </Txt>
        ) : (
          <Txt typography="Pretendard36bold" color="antiWatcha2">
            아쉬워요..
          </Txt>
        )}
        <Txt>
          <Txt typography="Pretendard24bold">{movieQuiz.movieTitle}</Txt>의
          제작(배급)사 주가는 개봉 전/후 8주간 {Math.abs(priceDifference)}{' '}
          {movieQuiz.currency === 'KO' ? '원' : '달러'}{' '}
          {priceDifference > 0 ? '상승' : '하락'} 했습니다.
          <br />
          이는 주가의 약
          <Txt
            typography="Pretendard24bold"
            color={priceDifference >= 0 ? 'watcha' : 'antiWatcha3'}
          >
            {' '}
            {Math.abs(percentChange)}%{priceDifference >= 0 ? ' 상승' : ' 하락'}{' '}
          </Txt>
          한 것입니다.
        </Txt>
        <Button variant="fifth" onClick={handleClick}>
          <Txt>다음 문제</Txt>
        </Button>
      </div>
    </StyledResultItem>
  );
}

const StyledResultItem = styled.div`
  padding: 0 40px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;

  .image-container {
    min-width: 426px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    div {
      margin-top: 32px;
      display: flex;
      flex-direction: row;
      gap: 12px;
    }
  }
`;
