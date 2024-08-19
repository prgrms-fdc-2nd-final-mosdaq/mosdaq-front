import { Button } from '@/components/common/Button';
import React from 'react';

interface IQuizEndedProps {
  correctCount: number;
  setQuizStatus: React.Dispatch<
    React.SetStateAction<'waiting' | 'doing' | 'ended'>
  >;
}

export default function QuizEnded({
  correctCount,
  setQuizStatus,
}: IQuizEndedProps) {
  return (
    <div>
      <div>{correctCount}문제 맞추셨습니다. 짝짝짞 우와우와우와</div>
      <Button
        onClick={() => {
          setQuizStatus('doing');
        }}
      >
        다시 풀기
      </Button>
    </div>
  );
}
