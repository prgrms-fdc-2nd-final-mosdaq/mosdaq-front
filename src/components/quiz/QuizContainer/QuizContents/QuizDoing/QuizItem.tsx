import { Button } from '@/components/common/Button';
import { Txt } from '@/components/common/Txt';
import { IQuizInfo } from '@/models/quiz.model';
import React from 'react';
import { PiChartLineDownBold, PiChartLineUpBold } from 'react-icons/pi';
import styled from 'styled-components';

interface IQuizItemProps {
  currentQuizIndex: number;
  movieQuiz: IQuizInfo;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | null>>;
  setIsResult: React.Dispatch<React.SetStateAction<boolean>>;
  setCorrectCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuizItem({
  movieQuiz,
  setIsCorrect,
  setIsResult,
  currentQuizIndex,
  setCorrectCount,
}: IQuizItemProps) {
  const handleUpClick = () => {
    if (movieQuiz.fourWeeksAfterPrice > movieQuiz.fourWeeksBeforePrice) {
      setCorrectCount((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsResult(true);
  };
  const handleDownClick = () => {
    if (movieQuiz.fourWeeksAfterPrice < movieQuiz.fourWeeksBeforePrice) {
      setCorrectCount((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsResult(true);
  };
  return (
    <StyledQuizItem>
      <div className="image-container">
        <img src={movieQuiz.moviePoster[0]} alt={movieQuiz.movieTitle} />
      </div>
      <div>
        <Txt typography="Pretendard28bold">
          <Txt typography="Pretendard24bold" color="greyscale8">
            {currentQuizIndex + 1}/10.{' '}
          </Txt>
          {movieQuiz.movieTitle}
        </Txt>
        <Txt>
          <Txt typography="Pretendard24bold">{movieQuiz.companyName}</Txt>의
          개봉 후 주가는?
        </Txt>

        <div>
          <Button size="long" variant="forth" onClick={handleUpClick}>
            <Txt color="white">
              올랐다 <PiChartLineUpBold />
            </Txt>
          </Button>
          <Button size="long" variant="third" onClick={handleDownClick}>
            <Txt color="white">
              내렸다 <PiChartLineDownBold />
            </Txt>
          </Button>
        </div>
      </div>
    </StyledQuizItem>
  );
}

const StyledQuizItem = styled.div`
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
