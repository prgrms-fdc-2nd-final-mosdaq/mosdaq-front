import { Button } from '@/components/common/Button';
import { Txt } from '@/components/common/Txt';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

export default function MovieFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [sortState, setSortState] = useState<'ASC' | 'DESC'>('DESC');
  const [pollState, setPollState] = useState<'true' | 'false'>('true');

  useEffect(() => {
    setSearchParams({ sort: 'DESC', poll: 'true' });
  }, []);

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <StyledMovieFilter>
      {/* <StyledButtonContainer>
        <Button
          variant={sortState === 'ASC' ? 'filterActive' : 'filterInactive'}
          size="small"
          onClick={() => {
            setSortState('ASC');
            updateSearchParam('sort', 'ASC');
          }}
        >
          <Txt
            color={sortState === 'ASC' ? 'watcha' : 'greyscale9'}
            typography="Pretendard20bold"
          >
            오래된순
          </Txt>
        </Button>
        <Button
          variant={sortState === 'DESC' ? 'filterActive' : 'filterInactive'}
          size="small"
          onClick={() => {
            setSortState('DESC');
            updateSearchParam('sort', 'DESC');
          }}
        >
          <Txt
            color={sortState === 'DESC' ? 'watcha' : 'greyscale9'}
            typography="Pretendard20bold"
          >
            최신순
          </Txt>
        </Button>
      </StyledButtonContainer> */}
      <StyledButtonContainer>
        <Button
          variant={pollState === 'false' ? 'filterActive' : 'filterInactive'}
          onClick={() => {
            setPollState('false');
            updateSearchParam('poll', 'false');
          }}
          size="small"
        >
          <Txt
            color={pollState === 'false' ? 'watcha' : 'greyscale9'}
            typography="Pretendard20bold"
          >
            Voting Closed
          </Txt>
        </Button>
        <Button
          variant={pollState === 'true' ? 'filterActive' : 'filterInactive'}
          onClick={() => {
            setPollState('true');
            updateSearchParam('poll', 'true');
          }}
          size="small"
        >
          <Txt
            color={pollState === 'true' ? 'watcha' : 'greyscale9'}
            typography="Pretendard20bold"
          >
            Now Voting
          </Txt>
        </Button>
      </StyledButtonContainer>
    </StyledMovieFilter>
  );
}

const StyledMovieFilter = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;
