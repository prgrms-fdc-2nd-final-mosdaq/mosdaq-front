import styled from 'styled-components';
import { Txt } from '@/components/common/Txt';
import { IMovieDetail } from '@/models/movie.model';
import { IPollBox } from '@/models/poll.model';
import VoteButtonAfterMovieOpen from '@/components/vote/VoteButtonAfterMovieOpen';
import colors from '@/constants/colors';
import clockImg from '@/assets/images/movieDetail/clock.svg';
import { Divider, VoteNum } from './MovieDetailBeforeOpen';
import StockChart from '../common/StockChart';
import StockPriceInfo from '../home/Banner/StockPriceInfo';
import StockProfitInfo from '../home/Banner/StockProfitInfo';
import { useGetStockInfo } from '@/hooks/api/movie-detail/useGetStockInfo';
import { shiftDateByWeeks, getTodayYYYYMMDD } from '@/utils/date';
import { BsExclamationCircle } from 'react-icons/bs';
import Tooltip from '../common/Tooltip';
import VoteButton from '../vote/VoteButton';

interface Props {
  movieDetail: IMovieDetail;
  pollBox: IPollBox;
  movieId: string;
}

export default function MovieDetailAfterOpen({
  movieDetail,
  pollBox,
  movieId,
}: Props) {
  const { stockMovieInfo } = useGetStockInfo(movieId);
  const { afterPriceDate, beforePrice, afterPrice, stockPriceList } =
    stockMovieInfo;
  const { pollResult, up, down } = pollBox;

  const isAfterMovieOpenDate = getTodayYYYYMMDD() >= afterPriceDate;
  // 4주 전후 주가 변동의 결과
  const pollAnswer: 'up' | 'down' = beforePrice <= afterPrice ? 'up' : 'down';
  const isNotYet4WeeksLater =
    shiftDateByWeeks(movieDetail.movieOpenDate, false) > getTodayYYYYMMDD();
  return (
    <>
      <VotingContainer>
        <VotingStatus>
          <div className="voting-status-left">
            <Txt typography="Pretendard24bold" color="watcha">
              예측 종료
            </Txt>
            <VoteNum typography="Pretendard24bold" color="white">
              {(pollBox.up + pollBox.down).toLocaleString()} 명 참여
            </VoteNum>
          </div>
          {pollResult &&
            (isNotYet4WeeksLater ? (
              <Tooltip
                text="아직 개봉 후 4주가 지나지 않아 결과가 나오지 않았습니다."
                position="left"
              >
                <BsExclamationCircle
                  style={{
                    fontSize: '25px',
                    fill: colors.greyscale8,
                    marginLeft: '10px',
                  }}
                />
              </Tooltip>
            ) : (
              <div className="voting-status-right">
                <Txt typography="Pretendard24bold" color="white">
                  {isAfterMovieOpenDate && pollAnswer === pollResult
                    ? '예측 성공!'
                    : '예측 실패'}
                </Txt>
              </div>
            ))}
        </VotingStatus>

        {isNotYet4WeeksLater ? (
          // 버튼 수정하기로
          <VoteButton
            onUpVote={() => {
              console.log('Upvoted!');
            }}
            onDownVote={() => {
              console.log('Downvoted!');
            }}
          />
        ) : (
          <VoteButtonAfterMovieOpen
            up={up}
            down={down}
            myPollResult={pollResult}
            pollAnswer={pollAnswer}
            isNotYet4WeeksLater={isNotYet4WeeksLater}
          />
        )}
      </VotingContainer>
      <Divider />
      <StockContainer>
        <Txt typography="Pretendard32bold">{stockMovieInfo.companyName}</Txt>
        <StockChart
          stockPriceList={stockPriceList}
          movieOpenDate={movieDetail.movieOpenDate}
          width={700}
          height={250}
        />
        <StockPriceInfo
          countryCode={stockMovieInfo.countryCode}
          price={stockMovieInfo.beforePrice}
          priceDate={stockMovieInfo.beforePriceDate}
          flag="before"
        />
        <StockPriceInfo
          countryCode={stockMovieInfo.countryCode}
          price={stockMovieInfo.afterPrice}
          priceDate={stockMovieInfo.afterPriceDate}
          flag="after"
        />

        <StockProfitInfo
          beforePrice={stockMovieInfo.beforePrice}
          afterPrice={stockMovieInfo.afterPrice}
        />
      </StockContainer>
    </>
  );
}

const VotingStatus = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

const StockContainer = styled.div`
  max-width: 750px;
  width: 100%;
  border: 1px solid ${colors.greyscale8};
  padding: 20px;
  border-radius: 12px;
`;

const VotingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
