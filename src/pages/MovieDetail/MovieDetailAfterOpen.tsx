import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { IMovieDetail } from '@/models/movie.model';
import { IPollBox } from '@/models/poll.model';
import { IStockMovieInfo } from '@/models/stock.model';
import VoteButton from '@/components/vote/voteButton';
import colors from '@/constants/colors';
import clockImg from '@/assets/images/movieDetail/clock.svg';
import { Divider, VoteContainer, VoteNum } from './MovieDetailBeforeOpen';

interface Props {
  movieDetail: IMovieDetail;
  pollBox: IPollBox;
  stockMovieInfo: IStockMovieInfo;
}

export default function MovieDetailAfterOpen({
  movieDetail,
  pollBox,
  stockMovieInfo,
}: Props) {
  const handleUpVote = () => {
    console.log('오른다 선택됨');
  };

  const handleDownVote = () => {
    console.log('내린다 선택됨');
  };

  return (
    <>
      <VotingStatus>
        <div className="voting-status-left">
          <Txt typography="Pretendard24bold" color="watcha">
            예측 종료
          </Txt>
          <VoteNum typography="Pretendard24bold" color="white">
            {(pollBox.up + pollBox.down).toLocaleString()} 명 참여
          </VoteNum>
        </div>
        <div className="voting-status-right">
          <Txt typography="Pretendard24bold" color="white">
            예측 성공!
          </Txt>
        </div>
      </VotingStatus>
      <VoteContainer>
        <VoteButton onUpVote={handleUpVote} onDownVote={handleDownVote} />
      </VoteContainer>
      <Divider />
    </>
  );
}

const VotingStatus = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;

  .voting-status-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 327px;
    height: 54px;
    border-radius: 20px;
    background-color: ${colors.watcha3};
  }
  .voting-status-left::before {
    content: '';
    display: block;
    width: 35px;
    height: 35px;
    background-image: url(${clockImg});
    background-size: cover;
    background-position: center;
  }

  .voting-status-right {
    display: flex;
    align-items: center;
    background-color: ${colors.watcha};
    border-radius: 20px;
    padding: 10px;
  }
`;
