import colors from '@/constants/colors';
import { Txt } from '@/components/common/Txt';
import styled from 'styled-components';
import { IMovie } from '../../../models/main-movie.model';

interface VotingStatusProps {
  myPollResult: IMovie['myPollResult'];
}

export default function votingStatus({ myPollResult }: VotingStatusProps) {
  return (
    <VotingStatusContainer>
      {myPollResult === null ? (
        <VotingNowContainer>
          <Txt typography="Pretendard20bold" color="watcha">
            Voting Now
          </Txt>
        </VotingNowContainer>
      ) : (
        <VotedContainer>
          <Txt typography="Pretendard20bold" color="greyscale9">
            Voted
          </Txt>
        </VotedContainer>
      )}
    </VotingStatusContainer>
  );
}

const VotingStatusContainer = styled.div`
  margin-top: 15px;
`;

const VotingNowContainer = styled.div`
  border: 2px solid ${colors.watcha};
  padding: 7px 8px;
  border-radius: 25px;
`;

const VotedContainer = styled.div`
  border: 2px solid ${colors.greyscale9};
  padding: 7px 8px;
  border-radius: 25px;
`;
