import upIcon from '../../../assets/images/main/mainUpBtn.png';
import downIcon from '../../../assets/images/main/mainDownBtn.png';
import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { useUpdateVote } from '@/hooks/api/main-movie/useUpdateVote';
import { IMovie } from '@/models/main-movie.model';

interface VoteButtonsProps {
  movieId: IMovie['movieId'];
}

export default function voteButtons({ movieId }: VoteButtonsProps) {
  const { updateVote } = useUpdateVote(movieId);

  const handleVoteUpdate = (voteType: string) => {
    updateVote(voteType);
  };

  return (
    <VoteContainer>
      <VoteButtonWrapper>
        <VoteButton
          src={upIcon}
          alt="upImg"
          onClick={() => handleVoteUpdate('up')}
        />
        <VoteText typography="Pretendard20bold" color="watcha">
          상승
        </VoteText>
      </VoteButtonWrapper>
      <VsText typography="Pretendard24bold" color="watcha">
        vs
      </VsText>
      <VoteButtonWrapper>
        <VoteButton
          src={downIcon}
          alt="DownImg"
          onClick={() => handleVoteUpdate('down')}
        />
        <VoteText typography="Pretendard20bold" color="watcha">
          하락
        </VoteText>
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
