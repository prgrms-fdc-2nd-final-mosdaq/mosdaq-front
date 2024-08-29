import { useEffect, useState } from 'react';
import upIcon from '../../../assets/images/main/mainUpBtn.png';
import downIcon from '../../../assets/images/main/mainDownBtn.png';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { useUpdateVote } from '@/hooks/api/main-movie/useUpdateVote';
import { IMovie } from '@/models/main-movie.model';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { fetchGetMainPollingMovie } from '@/apis/main-movie.api';
import { usePollMovie } from '@/hooks/api/poll/usePollMovie';
import { calculatePercentages } from '@/utils/math';

interface VoteButtonsProps {
  movie: IMovie;
}

export default function VoteButtons({ movie }: VoteButtonsProps) {
  const { pollMovie } = usePollMovie(movie.movieId.toString());

  const { upPercentage, downPercentage } = calculatePercentages(
    movie.up,
    movie.down,
  );

  return (
    <VoteContainer>
      <VoteButtonWrapper>
        {movie.myPollResult ? (
          <VoteText typography="Pretendard20bold" color="watcha">
            {upPercentage}%
          </VoteText>
        ) : (
          <>
            <VoteButton
              src={upIcon}
              alt="upImg"
              onClick={() => pollMovie('up')}
            />
            <VoteText typography="Pretendard20bold" color="watcha">
              상승
            </VoteText>
          </>
        )}
      </VoteButtonWrapper>
      <VsText typography="Pretendard24bold" color="watcha">
        vs
      </VsText>
      <VoteButtonWrapper>
        {movie.myPollResult ? (
          <VoteText typography="Pretendard20bold" color="watcha">
            {downPercentage}%
          </VoteText>
        ) : (
          <>
            <VoteButton
              src={downIcon}
              alt="DownImg"
              onClick={() => pollMovie('down')}
            />
            <VoteText typography="Pretendard20bold" color="watcha">
              하락
            </VoteText>
          </>
        )}
      </VoteButtonWrapper>
    </VoteContainer>
  );
}

const VoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 28px;
`;

const VoteButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoteButton = styled.img`
  width: 40px;
  height: 44px;
  cursor: pointer;
`;

const VoteText = styled(Txt)`
  margin-top: 5px;
`;

const VsText = styled(Txt)`
  margin: 0 20px;
`;
